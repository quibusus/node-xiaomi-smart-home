import GenericSensor from "./GenericSensor";
import {Hub} from "../Hub";
import HubMessage from "../Types/HubMessage";
export default class Gateway extends GenericSensor {



    constructor(sid: string, hub: Hub) {
        super(sid, hub);
        this.hub.sendMessage({cmd: "get_id_list", sid: sid});

    }

    onMessage(message: HubMessage)
    {
        if (message.cmd == 'get_id_list_ack')
        {
            this.initSensors(message.data);
        }

    }

    initSensors(sids: string[])
    {
        for (let sid of sids) {
            this.hub.sendMessage({cmd: "read", sid: sid});
        }
    }

}

