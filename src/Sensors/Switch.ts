import GenericSensor from "./GenericSensor";
import HubMessage from "../Types/HubMessage";
export default class Switch extends GenericSensor {


    onMessage(message: HubMessage)
    {
        // could be click, double_click, long_click_press, long_click_release
        this.hub.emit(message.data.status, this);
    }

}

