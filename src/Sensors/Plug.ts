import IHubMessage from "../Types/IHubMessage";
import GenericSensor from "./GenericSensor";
export default class Plug extends GenericSensor {

    private on: boolean;
    public onMessage(message: IHubMessage) {
        this.on = message.data.status === "on";
        if (message.cmd === "report" || message.cmd === "read_ack") {
              this.hub.emit("data.plug", this.sid, this.on);
        }
    }
}
