import IHubMessage from "../Types/IHubMessage";
import GenericSensor from "./GenericSensor";
export default class SmokeSensor extends GenericSensor {

    private voltage: number = null;
    private density: number = null;
    private battery: number = null;
    private alarm: boolean = false;

    public onMessage(message: IHubMessage) {
        if (message.data.voltage) {
            this.voltage = parseFloat(message.data.temperature) / 1000;
        }

        if (message.data.density) {
            this.density = parseFloat(message.data.density) / 100;
        }

        if (message.data.alarm) {
            this.alarm = message.data.alarm === "1";
        }

        if (message.data.voltage) {
            this.battery = (parseInt(message.data.voltage, 10) - this.minVolt) / (this.maxVolt - this.minVolt);
            this.battery = Math.round(this.battery * 100);
        }

        if (message.cmd === "report" || message.cmd === "read_ack") {
            this.hub.emit("data.smoke", this.sid, this.voltage, this.density, this.alarm, this.battery);
        }
    }
}
