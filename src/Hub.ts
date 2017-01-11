import {createSocket, Socket, AddressInfo} from 'dgram'
import events = require('events');
import Sensor from './Sensors/GenericSensor'
import Gateway from "./Sensors/Gateway";
import GenericSensor from "./Sensors/GenericSensor";
import HubMessage from "./Types/HubMessage";
import THSensor from "./Sensors/THSensor";
import DoorSensor from "./Sensors/DoorSensor";
import Switch from "./Sensors/Switch";
import MotionSensor from "./Sensors/MotionSensor";


export default class Hub extends events.EventEmitter{
    socket: Socket;
    sensors: { [id: string]: Sensor;} = {};
    sensorTypes = {
        gateway: 'gateway',
        th: 'sensor_ht`',
        switch: 'switch',
        plug: 'plug',
        door: 'door',
        motion: 'motion'
    };

    constructor() {
        super();
    }
    
    listen() {
        let dgram = require('dgram')
        this.socket = createSocket('udp4');

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


    onListening()
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
    onError(err: Error)
    {
        this.emit('error', err);
    }

    /**
     *
     * @param msgBuffer
     * @param rinfo
     */
    onMessage(msgBuffer:Buffer)
    {

        try {
            var msg: HubMessage = JSON.parse(msgBuffer.toString());
        }
        catch(e)
        {
            return
        }

        if(!msg.model)
        {
            return;
        }

        let sensor = this.getSensor(msg.sid);
        if (!sensor)
        {
            sensor = this.sensorFactory(msg.sid, msg.model);
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

    sensorFactory(sid: string, model: string)
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

            case this.sensorTypes.door:
                sensor = new DoorSensor(sid, this);
                break

            case this.sensorTypes.switch:
                sensor = new Switch(sid, this);
                break

            case this.sensorTypes.door:
                sensor = new DoorSensor(sid, this);
                break

            case this.sensorTypes.motion:
                sensor = new MotionSensor(sid, this);
                break

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
    getSensor(sid: string): Sensor
    {
        return this.sensors[sid] ? this.sensors[sid] : null;
    }

    registerSensor(sensor: Sensor)
    {
        this.sensors[sensor.sid] = sensor;
    }
}

