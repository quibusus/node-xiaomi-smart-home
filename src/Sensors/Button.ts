import GenericSensor from "./GenericSensor";
import HubMessage from "../Types/HubMessage";
export default class Button extends GenericSensor {

    onMessage(message: HubMessage)
    {
        // could be click, double_click, long_click_press, long_click_release - see hub::clickTypes
        if (message.cmd == 'report') {
            this.hub.emit('data.button', this.sid, message.data.status);
        }
    }

}

