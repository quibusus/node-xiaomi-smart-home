import IHubMessage from "../Types/IHubMessage";
import GenericSensor from "./GenericSensor";
export default class MotionSensor extends GenericSensor {

    private motion: boolean = null;
    private battery: number = null;
    public onMessage(message: IHubMessage) {
        if (message.data.voltage) {
            this.battery = (parseInt(message.data.voltage, 10) - this.minVolt) / (this.maxVolt - this.minVolt);
            this.battery = Math.round(this.battery * 100);
        }

        this.motion = message.data.status === "motion";
        if (message.cmd === "report" || message.cmd === "read_ack") {
            this.hub.emit("data.motion", this.sid, this.motion, this.battery);
        }
    }
}
