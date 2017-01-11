import GenericSensor from "./GenericSensor";
import HubMessage from "../Types/HubMessage";
export default class THSensor extends GenericSensor {

    private temperature: number = null;
    private humidity: number = null;
    onMessage(message: HubMessage)
    {
        if (message.data.temperature)
        {
            this.temperature = parseInt(message.data.temperature) / 100;
        }

        if (message.data.humidity)
        {
            this.humidity = parseInt(message.data.humidity) / 100;
        }


        if (message.cmd == 'report' || message.cmd == 'read_ack')
        {
            this.hub.emit('data.th', this.sid, this.temperature, this.humidity);
        }
    }
}

