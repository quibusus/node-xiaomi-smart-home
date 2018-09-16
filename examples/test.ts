/* tslint:disable:no-console */

// import {Hub} from "node-xiaomi-smart-home"
import {Hub} from "./../src/Hub";

const hub = new Hub();
hub.listen();

hub.on("message", (message: any) => {
    // raw message received from the xiaomi smart hub
});

hub.on("error", (e: Error) => {
    // do something
});

hub.on("data.button", (sid: string, type: string, battery: number) => {
    // type can be click, double_click, long_click_press, long_click_release
    if (type === hub.clickTypes.double_click) {
        // do something
    }
    console.info("BUTTON", sid, type, battery);
});

hub.on("data.magnet", (sid: string, closed: boolean, battery: number) => {
    console.info("MAGNET", sid, closed, battery);

});

hub.on("data.motion", (sid: string, motion: boolean, battery: number) => {
    console.info("motion", sid, motion, battery);
});

hub.on("data.motionAq2", (sid: string, motion: boolean, light: number, inactivity: number, battery: number) => {
    console.info("motion", sid, motion, light, inactivity, battery);
});

hub.on("data.th", (sid: string, temperature: number, humidity: number, battery: number) => {
    console.info("th", sid, temperature, humidity, battery);
});

hub.on("data.weather", (sid: string, temperature: number, humidity: number, pressure: number, battery: number) => {
    console.info("weather", sid, temperature, humidity, pressure, battery);
});

hub.on("data.plug", (sid: string, on: boolean) => {
    console.info("plug", sid, on);
});

hub.on("data.cube", (sid: string, type: string, battery: number) => {
    // could flip90 , flip180 , move , tap_twice , shake_air , swing , alert , free_fall
    if (type === hub.cubeTypes.shake_air) {
        // do something
    }
    console.info("CUBE", sid, type, battery);
});
