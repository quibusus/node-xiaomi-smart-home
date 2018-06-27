import {Hub} from "../Hub";
import IHubMessage from "../Types/IHubMessage";
export default class GenericSensor {
    public data: any = {};
    public hub: Hub;
    public minVolt: number = 2000;
    public maxVolt: number = 3300;

    public sid: string;
    public type: string = null;

    private lastHeartBeat: number = null;

    constructor(sid: string, hub: Hub) {
        this.sid = sid;
        this.hub = hub;
    }

    public onMessage(message: IHubMessage) {
        //
    }

    public heartBeat() {
        this.lastHeartBeat = (new Date()).getTime();
    }
}
