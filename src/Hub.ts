import {createSocket, Socket, AddressInfo} from 'dgram'
import events = require('events');
import Sensor from './Sensors/GenericSensor'
import Gateway from "./Sensors/Gateway";
import GenericSensor from "./Sensors/GenericSensor";
import HubMessage from "./Types/HubMessage";
import THSensor from "./Sensors/THSensor";
import DoorSensor from "./Sensors/DoorSensor";
import MotionSensor from "./Sensors/MotionSensor";
import Plug from "./Sensors/Plug";
import Button from "./Sensors/Button";
import WaterLeak from "./Sensors/WaterLeakSensor";
import Weather from "./Sensors/WeatherSensor";
import SmokeSensor from './Sensors/SmokeSensor';

export class Hub extends events.EventEmitter{
    socket: Socket;
    sensors: { [id: string]: Sensor;} = {};
    sensorTypes = {
        gateway: 'gateway',
        th: 'sensor_ht',
        // renamed for clarity and not to use switch keyword
        button: 'switch',
        plug: 'plug',
        magnet: 'magnet',
        motion: 'motion',
        weather: 'weather.v1',
        new_magnet: 'sensor_magnet.aq2',
        waterleak:'sensor_wleak.aq1',
        smoke: 'smoke'
    };

    clickTypes = {
        click: 'click',
        double_click: 'double_click',
        long_click_press: 'long_click_press',
        long_click_release: 'long_click_release',
    };

    leakTypes = {
        leak: 'leak',
        no_leak: 'no_leak',
    };

    constructor() {
        super();
    }
    
    listen() {
        let dgram = require('dgram')
        this.socket = createSocket({type:'udp4', reuseAddr: true});
        
        let multicastPort = 9898;

        this.socket.on('message', this.onMessage.bind(this));
        this.socket.on('error', this.onError.bind(this));
        this.socket.on('listening', this.onListening.bind(this));
        this.socket.bind(multicastPort);
    }

    stop(cb:Function)
    {
        this.socket.close(cb);
    }

    private onListening()
    {
        this.socket.setBroadcast(true);
        this.socket.setMulticastTTL(128);
        this.socket.addMembership('224.0.0.50');

        let whoIsCommand = '{"cmd": "whois"}';
        this.socket.send(whoIsCommand, 0, whoIsCommand.length, 4321, '224.0.0.50')

    }

    /**
     *
     * @param err
     */
    private onError(err: Error)
    {
        this.emit('error', err);
    }

    /**
     *
     * @param msgBuffer
     * @param rinfo
     */
    private onMessage(msgBuffer:Buffer)
    {

        try {
            var msg: HubMessage = JSON.parse(msgBuffer.toString());
        }
        catch(e)
        {
            return
        }

        let sensor = this.getSensor(msg.sid);
        if (!sensor)
        {
            if (!msg.model)
            {
                return;
            }
            try {
                sensor = this.sensorFactory(msg.sid, msg.model);
            }catch(e){
                this.emit('warning', 'Could not add new sensor: ' + e.message);
                return;
            }
        }

        // set heartbeat on all commands, we know that the sensor is alive
        sensor.heartBeat()

        if (msg.data)
        {
            msg.data = JSON.parse(msg.data);
        }

        if (msg.cmd == 'report' || msg.cmd.indexOf('_ack') != -1)
        {
            sensor.onMessage(msg);
        }
        this.emit('message', msg);
    }

    sendMessage(message: any)
    {
        let json = JSON.stringify(message);
        this.socket.send(json, 0, json.length, 9898, '224.0.0.50')
    }


    /**
     *
     */

    private sensorFactory(sid: string, model: string)
    {
        let sensor: GenericSensor = null;
        switch(model)
        {
            case this.sensorTypes.gateway:
                sensor = new Gateway(sid, this);
                break

            case this.sensorTypes.th:
                sensor = new THSensor(sid, this);
                break

            case this.sensorTypes.magnet:
            case this.sensorTypes.new_magnet:
                sensor = new DoorSensor(sid, this);
                break

            case this.sensorTypes.button:
                sensor = new Button(sid, this);
                break

            case this.sensorTypes.plug:
                sensor = new Plug(sid, this);
                break

            case this.sensorTypes.motion:
                sensor = new MotionSensor(sid, this);
                break

            case this.sensorTypes.weather:
                sensor = new Weather(sid, this);
                break

            case this.sensorTypes.waterleak:
                sensor = new WaterLeak(sid, this);
                break
            
            case this.sensorTypes.smoke:
                sensor = new SmokeSensor(sid, this);
                break;

            default:
                throw new Error('Type `' + model + '` is not valid, use one of  Hub::sensorTypes');
        }
        this.registerSensor(sensor);
        return sensor;

    }


    /**
     *
     * @param sid
     */
    private getSensor(sid: string): Sensor
    {
        return this.sensors[sid] ? this.sensors[sid] : null;
    }

    /**
     *
     * @param sensor
     */
    private registerSensor(sensor: Sensor)
    {
        this.sensors[sensor.sid] = sensor;
    }
}

