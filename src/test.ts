import GenericSensor from "./Sensors/GenericSensor";

import Hub from "./Hub"


let hub = new Hub();

let thSensor = hub.sensorFactory('158d000116df97', hub.sensorTypes.th);
thSensor.on('change', function (data: any) {
    console.info("got thermometer value:", data);
});

hub.listen();

// hub.on('message', function (message:any) {
//     console.info("got message:", JSON.stringify(message));
// });

hub.on('data', function (sensor:GenericSensor) {
    console.info("got value:", sensor.sid, sensor.data);
});