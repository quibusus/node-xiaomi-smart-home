import GenericSensor from "./GenericSensor";
import HubMessage from "../Types/HubMessage";
export default class WaterLeakSensor extends GenericSensor {

    private battery: number = null;

    onMessage(message: HubMessage)
    {
        if (message.data.voltage)
        {
            this.battery = (parseInt(message.data.voltage) - this.minVolt) / (this.maxVolt - this.minVolt);
            this.battery = Math.round(this.battery * 100);
        }

        // could be leak, no_leak
        if (message.cmd == 'report') {
            this.hub.emit('data.waterleak', this.sid, message.data.status, this.battery);
        }
    }

}

