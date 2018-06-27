import IHubMessage from "../Types/IHubMessage";
import GenericSensor from "./GenericSensor";
export default class DoorSensor extends GenericSensor {

    private closed: boolean = null;
    private battery: number = null;
    public onMessage(message: IHubMessage) {
        if (message.data.voltage) {
            this.battery = (parseInt(message.data.voltage, 10) - this.minVolt) / (this.maxVolt - this.minVolt);
            this.battery = Math.round(this.battery * 100);
        }

        this.closed = message.data.status === "close";
        if (message.cmd === "report" || message.cmd === "read_ack") {
            this.hub.emit("data.magnet", this.sid, this.closed, this.battery);
        }
    }
}
