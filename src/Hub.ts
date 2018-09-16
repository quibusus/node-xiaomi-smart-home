import { AddressInfo, createSocket, Socket } from "dgram";
import events = require("events");
import Button from "./Sensors/Button";
import Cube from "./Sensors/Cube";
import DoorSensor from "./Sensors/DoorSensor";
import Gateway from "./Sensors/Gateway";
import GenericSensor from "./Sensors/GenericSensor";
import MotionSensor from "./Sensors/MotionSensor";
import MotionSensorAq2 from "./Sensors/MotionSensorAq2";
import Plug from "./Sensors/Plug";
import SmokeSensor from "./Sensors/SmokeSensor";
import THSensor from "./Sensors/THSensor";
import WaterLeak from "./Sensors/WaterLeakSensor";
import Weather from "./Sensors/WeatherSensor";
import IHubMessage from "./Types/IHubMessage";

export class Hub extends events.EventEmitter {
    public socket: Socket;
    public sensors: { [id: string]: GenericSensor; } = {};
    public sensorTypes = {
        gateway: "gateway",
        th: "sensor_ht",

         // renamed for clarity and not to use switch keyword
        button: "switch",
        buttonAq2: "sensor_switch.aq2",
        cube: "sensor_cube.aqgl01",
        magnet: "magnet",
        magnetAq2: "sensor_magnet.aq2",
        motion: "motion",
        motionAq2: "sensor_motion.aq2",
        plug: "plug",
        smoke: "smoke",
        waterleak: "sensor_wleak.aq1",
        weather: "weather.v1",
    };

    public clickTypes = {
        click: "click",
        double_click: "double_click",
        long_click_press: "long_click_press",
        long_click_release: "long_click_release",
    };

    public cubeTypes = {
        alert: "alert",
        flip180: "flip180",
        flip90: "flip90",
        free_fall: "free_fall",
        move: "move",
        shake_air: "shake_air",
        swing: "swing",
        tap_twice: "tap_twice",
    };

    public leakTypes = {
        leak: "leak",
        no_leak: "no_leak",
    };

    constructor() {
        super();
    }

    public listen() {
        const dgram = require("dgram");
        this.socket = createSocket({ type: "udp4", reuseAddr: true });

        const multicastPort = 9898;

        this.socket.on("message", this.onMessage.bind(this));
        this.socket.on("error", this.onError.bind(this));
        this.socket.on("listening", this.onListening.bind(this));
        this.socket.bind(multicastPort);
    }

    public stop(cb: () => void) {
        this.socket.close(cb);
    }

    public sendMessage(message: any) {
        const json = JSON.stringify(message);
        this.socket.send(json, 0, json.length, 9898, "224.0.0.50");
    }

    private onListening() {
        this.socket.setBroadcast(true);
        this.socket.setMulticastTTL(128);
        this.socket.addMembership("224.0.0.50");

        const whoIsCommand = '{"cmd": "whois"}';
        this.socket.send(whoIsCommand, 0, whoIsCommand.length, 4321, "224.0.0.50");

    }

    /**
     *
     * @param err
     */
    private onError(err: Error) {
        this.emit("error", err);
    }

    /**
     *
     * @param msgBuffer
     * @param rinfo
     */
    private onMessage(msgBuffer: Buffer) {

        let msg: IHubMessage = null;
        try {
            msg = JSON.parse(msgBuffer.toString());
        } catch (e) {
            return;
        }

        let sensor = this.getSensor(msg.sid);
        if (!sensor) {
            if (!msg.model) {
                return;
            }
            try {
                sensor = this.sensorFactory(msg.sid, msg.model);
            } catch (e) {
                this.emit("warning", "Could not add new sensor: " + e.message);
                return;
            }
        }

        // set heartbeat on all commands, we know that the sensor is alive
        sensor.heartBeat();

        if (msg.data) {
            msg.data = JSON.parse(msg.data);
        }

        if (msg.cmd === "report" || msg.cmd.indexOf("_ack") !== -1) {
            sensor.onMessage(msg);
        }
        this.emit("message", msg);
    }

    /**
     *
     */

    private sensorFactory(sid: string, model: string) {
        let sensor: GenericSensor = null;
        switch (model) {
            case this.sensorTypes.gateway:
                sensor = new Gateway(sid, this);
                break;

            case this.sensorTypes.th:
                sensor = new THSensor(sid, this);
                break;

            case this.sensorTypes.magnet:
            case this.sensorTypes.magnetAq2:
                sensor = new DoorSensor(sid, this);
                break;

            case this.sensorTypes.button:
            case this.sensorTypes.buttonAq2:
                sensor = new Button(sid, this);
                break;

            case this.sensorTypes.plug:
                sensor = new Plug(sid, this);
                break;

            case this.sensorTypes.motion:
                sensor = new MotionSensor(sid, this);
                break;

            case this.sensorTypes.motionAq2:
                sensor = new MotionSensorAq2(sid, this);
                break;

            case this.sensorTypes.weather:
                sensor = new Weather(sid, this);
                break;

            case this.sensorTypes.waterleak:
                sensor = new WaterLeak(sid, this);
                break;

            case this.sensorTypes.smoke:
                sensor = new SmokeSensor(sid, this);
                break;

            case this.sensorTypes.cube:
                sensor = new Cube(sid, this);
                break;

            default:
                throw new Error("Type `" + model + "` is not valid, use one of  Hub::sensorTypes");
        }
        this.registerSensor(sensor);
        return sensor;

    }

    /**
     *
     * @param sid
     */
    private getSensor(sid: string): GenericSensor {
        return this.sensors[sid] ? this.sensors[sid] : null;
    }

    /**
     *
     * @param sensor
     */
    private registerSensor(sensor: GenericSensor) {
        this.sensors[sensor.sid] = sensor;
    }
}
