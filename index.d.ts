declare module 'node-xiaomi-smart-home/Types/IHubMessage' {
	interface IHubMessage {
	    cmd: string;
	    model: string;
	    sid: string;
	    short_id: string;
	    token: string;
	    ip: string;
	    data: any;
	}
	export default IHubMessage;

}
declare module 'node-xiaomi-smart-home/Sensors/GenericSensor' {
	import { Hub } from 'node-xiaomi-smart-home/Hub';
	import IHubMessage from 'node-xiaomi-smart-home/Types/IHubMessage';
	export default class GenericSensor {
	    data: any;
	    hub: Hub;
	    minVolt: number;
	    maxVolt: number;
	    sid: string;
	    type: string;
	    private lastHeartBeat;
	    constructor(sid: string, hub: Hub);
	    onMessage(message: IHubMessage): void;
	    heartBeat(): void;
	}

}
declare module 'node-xiaomi-smart-home/Sensors/Button' {
	import IHubMessage from 'node-xiaomi-smart-home/Types/IHubMessage';
	import GenericSensor from 'node-xiaomi-smart-home/Sensors/GenericSensor';
	export default class Button extends GenericSensor {
	    private battery;
	    onMessage(message: IHubMessage): void;
	}

}
declare module 'node-xiaomi-smart-home/Sensors/Cube' {
	import IHubMessage from 'node-xiaomi-smart-home/Types/IHubMessage';
	import GenericSensor from 'node-xiaomi-smart-home/Sensors/GenericSensor';
	export default class Cube extends GenericSensor {
	    private battery;
	    onMessage(message: IHubMessage): void;
	}

}
declare module 'node-xiaomi-smart-home/Sensors/DoorSensor' {
	import IHubMessage from 'node-xiaomi-smart-home/Types/IHubMessage';
	import GenericSensor from 'node-xiaomi-smart-home/Sensors/GenericSensor';
	export default class DoorSensor extends GenericSensor {
	    private closed;
	    private battery;
	    onMessage(message: IHubMessage): void;
	}

}
declare module 'node-xiaomi-smart-home/Sensors/Gateway' {
	import { Hub } from 'node-xiaomi-smart-home/Hub';
	import IHubMessage from 'node-xiaomi-smart-home/Types/IHubMessage';
	import GenericSensor from 'node-xiaomi-smart-home/Sensors/GenericSensor';
	export default class Gateway extends GenericSensor {
	    constructor(sid: string, hub: Hub);
	    onMessage(message: IHubMessage): void;
	    initSensors(sids: string[]): void;
	}

}
declare module 'node-xiaomi-smart-home/Sensors/MotionSensor' {
	import IHubMessage from 'node-xiaomi-smart-home/Types/IHubMessage';
	import GenericSensor from 'node-xiaomi-smart-home/Sensors/GenericSensor';
	export default class MotionSensor extends GenericSensor {
	    private motion;
	    private battery;
	    onMessage(message: IHubMessage): void;
	}

}
declare module 'node-xiaomi-smart-home/Sensors/MotionSensorAq2' {
	import IHubMessage from 'node-xiaomi-smart-home/Types/IHubMessage';
	import GenericSensor from 'node-xiaomi-smart-home/Sensors/GenericSensor';
	export default class MotionSensorAq2 extends GenericSensor {
	    private motion;
	    private battery;
	    private light;
	    private inactivity;
	    onMessage(message: IHubMessage): void;
	}

}
declare module 'node-xiaomi-smart-home/Sensors/Plug' {
	import IHubMessage from 'node-xiaomi-smart-home/Types/IHubMessage';
	import GenericSensor from 'node-xiaomi-smart-home/Sensors/GenericSensor';
	export default class Plug extends GenericSensor {
	    private on;
	    onMessage(message: IHubMessage): void;
	}

}
declare module 'node-xiaomi-smart-home/Sensors/SmokeSensor' {
	import IHubMessage from 'node-xiaomi-smart-home/Types/IHubMessage';
	import GenericSensor from 'node-xiaomi-smart-home/Sensors/GenericSensor';
	export default class SmokeSensor extends GenericSensor {
	    private voltage;
	    private density;
	    private battery;
	    private alarm;
	    onMessage(message: IHubMessage): void;
	}

}
declare module 'node-xiaomi-smart-home/Sensors/THSensor' {
	import IHubMessage from 'node-xiaomi-smart-home/Types/IHubMessage';
	import GenericSensor from 'node-xiaomi-smart-home/Sensors/GenericSensor';
	export default class THSensor extends GenericSensor {
	    private temperature;
	    private humidity;
	    private battery;
	    onMessage(message: IHubMessage): void;
	}

}
declare module 'node-xiaomi-smart-home/Sensors/WaterLeakSensor' {
	import IHubMessage from 'node-xiaomi-smart-home/Types/IHubMessage';
	import GenericSensor from 'node-xiaomi-smart-home/Sensors/GenericSensor';
	export default class WaterLeakSensor extends GenericSensor {
	    private battery;
	    onMessage(message: IHubMessage): void;
	}

}
declare module 'node-xiaomi-smart-home/Sensors/WeatherSensor' {
	import IHubMessage from 'node-xiaomi-smart-home/Types/IHubMessage';
	import GenericSensor from 'node-xiaomi-smart-home/Sensors/GenericSensor';
	export default class WeatherSensor extends GenericSensor {
	    private temperature;
	    private humidity;
	    private pressure;
	    private battery;
	    onMessage(message: IHubMessage): void;
	}

}
declare module 'node-xiaomi-smart-home/Hub' {
	import { Socket } from "dgram";
	import events = require("events");
	import GenericSensor from 'node-xiaomi-smart-home/Sensors/GenericSensor';
	export class Hub extends events.EventEmitter {
	    socket: Socket;
	    sensors: {
	        [id: string]: GenericSensor;
	    };
	    sensorTypes: {
	        gateway: string;
	        th: string;
	        button: string;
	        buttonAq2: string;
	        cube: string;
	        magnet: string;
	        magnetAq2: string;
	        motion: string;
	        motionAq2: string;
	        plug: string;
	        smoke: string;
	        waterleak: string;
	        weather: string;
	    };
	    clickTypes: {
	        click: string;
	        double_click: string;
	        long_click_press: string;
	        long_click_release: string;
	    };
	    cubeTypes: {
	        alert: string;
	        flip180: string;
	        flip90: string;
	        free_fall: string;
	        move: string;
	        shake_air: string;
	        swing: string;
	        tap_twice: string;
	    };
	    leakTypes: {
	        leak: string;
	        no_leak: string;
	    };
	    constructor();
	    listen(): void;
	    stop(cb: () => void): void;
	    sendMessage(message: any): void;
	    private onListening;
	    private onError;
	    private onMessage;
	    private sensorFactory;
	    private getSensor;
	    private registerSensor;
	}

}
declare module 'node-xiaomi-smart-home/test' {
	export {};

}
