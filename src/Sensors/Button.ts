import IHubMessage from "../Types/IHubMessage";
import GenericSensor from "./GenericSensor";
export default class Button extends GenericSensor {

    private battery: number = null;

    public onMessage(message: IHubMessage) {
        if (message.data.voltage) {
            this.battery = (parseInt(message.data.voltage, 10) - this.minVolt) / (this.maxVolt - this.minVolt);
            this.battery = Math.round(this.battery * 100);
        }

        // could be click, double_click, long_click_press, long_click_release - see hub::clickTypes
        if (message.cmd === "report") {
            this.hub.emit("data.button", this.sid, message.data.status, this.battery);
        }
    }

}
