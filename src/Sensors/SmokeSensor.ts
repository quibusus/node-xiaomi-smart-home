import GenericSensor from "./GenericSensor";
import HubMessage from "../Types/HubMessage";
export default class SmokeSensor extends GenericSensor {

    private voltage: number = null;
    private density: number = null;
    private alarm: boolean = false;

    onMessage(message: HubMessage)
    {
        if (message.data.voltage)
        {
            this.voltage = parseFloat(message.data.temperature) / 1000;
        }

        if (message.data.density)
        {
            this.density = parseFloat(message.data.density) / 100;
        }

        if (message.data.alarm)
        {
            this.alarm = message.data.alarm === '1';
        }


        if (message.cmd == 'report' || message.cmd == 'read_ack')
        {
            this.hub.emit('data.smoke', this.sid, this.voltage, this.density, this.alarm);
        }
    }
}

