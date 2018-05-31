import {Hub} from "../Hub";
import HubMessage from "../Types/HubMessage";
export default class GenericSensor{

    private lastHeartBeat: number = null;
    data: any = {};
    hub: Hub;
    minVolt: number = 2000;
    maxVolt: number = 3100;

    sid: string;
    type: string = null;


    constructor(sid: string, hub: Hub) {
        this.sid = sid;
        this.hub = hub;
    }

    onMessage(message: HubMessage)
    {

    }



    heartBeat()
    {
        this.lastHeartBeat = (new Date()).getTime();
    }
}

