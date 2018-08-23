const Hub = require('node-xiaomi-smart-home').Hub;

let hub = new Hub();
hub.listen();

hub.on('message', function (message:any) {
    // raw message received from the xiaomi smart hub
});

hub.on('error', function (e: Error) {

});

hub.on('data.button', function (sid: string, type: string, battery: number) {
    // type can be click, double_click, long_click_press, long_click_release
    if (type == hub.clickTypes.double_click)
    {
        // do something
    }
    console.info('BUTTON', sid, type, battery);
});

hub.on('data.magnet', function (sid: string, closed: boolean, battery: number) {
    console.info('MAGNET', sid, closed, battery);

});

hub.on('data.motion', function (sid: string, motion: boolean, battery: number) {
    console.info('motion', sid, motion, battery);
});

hub.on('data.motionAq2', function (sid: string, motion: boolean, light: number, inactivity: number, battery: number) {
    console.info('motion', sid, motion, light, inactivity, battery);
});

hub.on('data.th', function (sid: string, temperature: number, humidity: number, battery: number) {
    console.info('th', sid, temperature, humidity, battery);
});

hub.on('data.plug', function (sid: string, on: boolean) {
    console.info('plug', sid, on);
});





