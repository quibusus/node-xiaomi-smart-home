import IHubMessage from "../Types/IHubMessage";
import GenericSensor from "./GenericSensor";
export default class THSensor extends GenericSensor {

    private temperature: number = null;
    private humidity: number = null;
    private battery: number = null;
    public onMessage(message: IHubMessage) {
        if (message.data.temperature) {
            this.temperature = parseInt(message.data.temperature, 10) / 100;
        }

        if (message.data.humidity) {
            this.humidity = parseInt(message.data.humidity, 10) / 100;
        }

        if (message.data.voltage) {
            this.battery = (parseInt(message.data.voltage, 10) - this.minVolt) / (this.maxVolt - this.minVolt);
            this.battery = Math.round(this.battery * 100);
        }

        if (message.cmd === "report" || message.cmd === "read_ack") {
            this.hub.emit("data.th", this.sid, this.temperature, this.humidity, this.battery);
        }
    }
}
