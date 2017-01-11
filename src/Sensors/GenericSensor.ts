import Hub from "../Hub";
import events = require('events');
import HubMessage from "../Types/HubMessage";
export default class GenericSensor  extends events.EventEmitter {

    private lastHeartBeat: number = null;
    data: any = {};
    hub: Hub;

    sid: string;
    type: string = null;


    constructor(sid: string, hub: Hub) {
        super();
        this.sid = sid;
        this.hub = hub;
    }

    onMessage(message: HubMessage)
    {
        for (var attrname in message.data)
        {
            this.data[attrname] = message.data[attrname];
        }

        this.hub.emit('data', this);
    }

    heartBeat()
    {
        this.lastHeartBeat = (new Date()).getTime();
    }
}

