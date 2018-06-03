import GenericSensor from "./GenericSensor";
import HubMessage from "../Types/HubMessage";
export default class MotionSensorAq2 extends GenericSensor {

    private motion: boolean = null;
    private battery: number = null;
    private light: number = null;
    private inactivity: number = null;
    onMessage(message: HubMessage)
    {
        if (message.data.voltage)
        {
            this.battery = (parseInt(message.data.voltage) - this.minVolt) / (this.maxVolt - this.minVolt);
            this.battery = Math.round(this.battery * 100);
        }

        if (message.data.lux)
        {
            this.light = parseInt(message.data.lux);
        }

        if (message.data.no_motion)
        {
            this.inactivity = parseInt(message.data.no_motion);
        }

        this.motion = message.data.status == 'motion'

        if (message.cmd == 'report' || message.cmd == 'read_ack')
        {
            this.hub.emit('data.motionAq2', this.sid, this.motion, this.light, this.inactivity, this.battery);
        }
    }
}

