import GenericSensor from "./GenericSensor";
import HubMessage from "../Types/HubMessage";
export default class WaterLeakSensor extends GenericSensor {

    onMessage(message: HubMessage)
    {
        // could be leak, no_leak
        if (message.cmd == 'report') {
            this.hub.emit('data.waterleak', this.sid, message.data.status);
        }
    }

}

