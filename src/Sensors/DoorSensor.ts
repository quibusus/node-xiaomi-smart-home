import GenericSensor from "./GenericSensor";
import HubMessage from "../Types/HubMessage";
export default class DoorSensor extends GenericSensor {

    private closed: boolean = null;
    onMessage(message: HubMessage)
    {
        this.closed = message.data.status == 'close'
        if (message.cmd == 'report' || message.cmd == 'read_ack')
        {
            this.hub.emit('data.magnet', this.sid, this.closed);
        }
    }
}

