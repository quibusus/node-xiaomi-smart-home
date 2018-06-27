import {Hub} from "../Hub";
import IHubMessage from "../Types/IHubMessage";
import GenericSensor from "./GenericSensor";
export default class Gateway extends GenericSensor {

    constructor(sid: string, hub: Hub) {
        super(sid, hub);
        this.hub.sendMessage({cmd: "get_id_list", sid});

    }

    public onMessage(message: IHubMessage) {
        if (message.cmd === "get_id_list_ack") {
            this.initSensors(message.data);
        }

    }

    public initSensors(sids: string[]) {
        for (const sid of sids) {
            this.hub.sendMessage({cmd: "read", sid});
        }
    }

}
