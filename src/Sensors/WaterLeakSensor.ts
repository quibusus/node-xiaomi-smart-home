import IHubMessage from "../Types/IHubMessage";
import GenericSensor from "./GenericSensor";
export default class WaterLeakSensor extends GenericSensor {

    private battery: number = null;

    public onMessage(message: IHubMessage) {
        if (message.data.voltage) {
            this.battery = (parseInt(message.data.voltage, 10) - this.minVolt) / (this.maxVolt - this.minVolt);
            this.battery = Math.round(this.battery * 100);
        }

        // could be leak, no_leak
        if (message.cmd === "report") {
            this.hub.emit("data.waterleak", this.sid, message.data.status, this.battery);
        }
    }

}
