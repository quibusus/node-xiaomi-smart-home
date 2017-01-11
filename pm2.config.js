module.exports = {
    apps : [{
        name        : "xiaomi-smart-hub-example",
        // script      : "./examples/index.js",
        script      : "./build/test.js",
        watch       : ['examples', 'build'],
        "source_map_support": true
    }]
}