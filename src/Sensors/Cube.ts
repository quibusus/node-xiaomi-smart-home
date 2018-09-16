import IHubMessage from "../Types/IHubMessage";
import GenericSensor from "./GenericSensor";
export default class Cube extends GenericSensor {

    private battery: number = null;

    public onMessage(message: IHubMessage) {
        if (message.data.voltage) {
            this.battery = (parseInt(message.data.voltage, 10) - this.minVolt) / (this.maxVolt - this.minVolt);
            this.battery = Math.round(this.battery * 100);
        }

        // could flip90 , flip180 , move , tap_twice , shake_air , swing , alert , free_fall - see hub::cubeTypes
        if (message.cmd === "report") {
            this.hub.emit("data.cube", this.sid, message.data.status, this.battery);
        }
    }

}
