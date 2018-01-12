import GenericSensor from "./GenericSensor";
import HubMessage from "../Types/HubMessage";
export default class WeatherSensor extends GenericSensor {

    private temperature: number = null;
    private humidity: number = null;
    private pressure: number = null;

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

        if (message.data.pressure)
        {
            this.pressure = parseInt(message.data.pressure);
        }


        if (message.cmd == 'report' || message.cmd == 'read_ack')
        {
            this.hub.emit('data.weather', this.sid, this.temperature, this.humidity, this.pressure);
        }
    }
}

