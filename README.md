# node-xiaomi-smart-home
Node.js module for [Xiaomi smart home](http://xiaomi-mi.com/smart-home/xiaomi-mi-smart-home-kit/) (also branded as Aquara)  



# Credit
This code is based on works of [Jonathan Schemoul, HackSpark.fr](https://github.com/jon1012/mihome)


# Example (TypeScript)

```typescript
import Hub from "node-xiaomi-smart-home"

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
});

hub.on('data.magnet', function (sid: string, closed: boolean) {

});

hub.on('data.motion', function (sid: string, motion: boolean) {

});

hub.on('data.th', function (sid: string, temperature: number, humidity: number) {

});

hub.on('data.plug', function (sid: string, on: boolean) {

});


```