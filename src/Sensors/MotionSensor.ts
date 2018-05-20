import GenericSensor from "./GenericSensor";
import HubMessage from "../Types/HubMessage";
export default class MotionSensor extends GenericSensor {

    private motion: boolean = null;
    private battery: number = null;
    onMessage(message: HubMessage)
    {
        if (message.data.voltage)
        {
            this.battery = (parseInt(message.data.voltage) - this.minVolt) / (this.maxVolt - this.minVolt);
            this.battery = Math.round(this.battery * 100);
        }

        this.motion = message.data.status == 'motion'
        if (message.cmd == 'report' || message.cmd == 'read_ack')
        {
            this.hub.emit('data.motion', this.sid, this.motion, this.battery);
        }
    }
}

