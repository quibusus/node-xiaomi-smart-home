var Hub = require("node-xiaomi-smart-home").Hub;
//var Hub = require("./../src/Hub").Hub;

let hub = new Hub();
hub.listen();

hub.on('message', function (message) {
    // raw message received from the xiaomi smart hub
});

hub.on('error', function (e) {

});

hub.on('data.button', function (sid, type, battery) {
    // type can be click, double_click, long_click_press, long_click_release
    if (type == hub.clickTypes.double_click)
    {
        // do something
    }
    console.info('BUTTON', sid, type);
});

hub.on('data.magnet', function (sid, closed, battery) {
    console.info('MAGNET', sid, closed, battery);

});

hub.on('data.motion', function (sid, motion, battery) {
    console.info('motion', sid, motion, battery);
});

hub.on('data.motionAq2', function (sid, motion, light, inactivity, battery) {
    console.info('motion', sid, motion, light, inactivity, battery);
});

hub.on('data.th', function (sid, temperature, humidity, battery) {
    console.info('th', sid, temperature, humidity, battery);
});

hub.on('data.plug', function (sid, on) {
    console.info('plug', sid, on);
});

hub.on('data.weather', function (sid, temperature, humidity, pressure, battery) {
    console.info('th', sid, temperature, humidity, pressure, battery);
});

