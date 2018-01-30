var Hub = require("node-xiaomi-smart-home").Hub;
//var Hub = require("./../src/Hub").Hub;

let hub = new Hub();
hub.listen();

hub.on('message', function (message) {
    // raw message received from the xiaomi smart hub
});

hub.on('error', function (e) {

});

hub.on('data.button', function (sid, type) {
    // type can be click, double_click, long_click_press, long_click_release
    if (type == hub.clickTypes.double_click)
    {
        // do something
    }
    console.info('BUTTON', sid, type);
});

hub.on('data.magnet', function (sid, closed) {
    console.info('MAGNET', sid, closed);

});

hub.on('data.motion', function (sid, motion) {
    console.info('motion', sid, motion);
});

hub.on('data.th', function (sid, temperature, humidity) {
    console.info('th', sid, temperature, humidity);
});

hub.on('data.plug', function (sid, on) {
    console.info('plug', sid, on);
});

hub.on('data.weather', function (sid, temperature, humidity, pressure) {
    console.info('th', sid, temperature, humidity, pressure);
});

