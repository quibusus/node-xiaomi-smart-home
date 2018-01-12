

import {Hub} from "./Hub"

let hub = new Hub();
hub.listen();

hub.on('message', function (message:any) {
    // raw message received from the xiaomi smart hub
});

hub.on('error', function (e: Error) {

});

hub.on('data.button', function (sid: string, type: string) {
    // type can be click, double_click, long_click_press, long_click_release
    if (type == hub.clickTypes.double_click)
    {
        // do something
    }
    console.info('BUTTON', sid, type);
});

hub.on('data.magnet', function (sid: string, closed: boolean) {
    console.info('MAGNET', sid, closed);

});

hub.on('data.motion', function (sid: string, motion: boolean) {
    console.info('motion', sid, motion);
});

hub.on('data.th', function (sid: string, temperature: number, humidity: number) {
    console.info('th', sid, temperature, humidity);
});

hub.on('data.plug', function (sid: string, on: boolean) {
    console.info('plug', sid, on);
});


hub.on('data.weather', function (sid: string, temperature: number, humidity: number, pressure:number) {
    console.info('weather', sid, temperature, humidity, pressure);
});

hub.on('data.waterleak', function (sid: string, leak:string) {
    console.info('leak', sid, leak);
});




