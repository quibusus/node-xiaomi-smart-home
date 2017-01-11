import GenericSensor from "./GenericSensor";
import HubMessage from "../Types/HubMessage";
export default class Plug extends GenericSensor {

    private on: boolean;
    onMessage(message: HubMessage)
    {
        this.on = message.data.status == 'on'
        if (message.cmd == 'report' || message.cmd == 'read_ack')
        {
              this.hub.emit('data.plug', this.sid, this.on);
        }
    }
}

