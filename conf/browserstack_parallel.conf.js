exports.config = {

    runner: 'local',
    
    hostname: 'hub.browserstack.com',
    port: 80,
    protocol: 'http',
    path: '/wd/hub',
    
    user: process.env.BROWSERSTACK_USERNAME,
    key: process.env.BROWSERSTACK_ACCESS_KEY,
    
    specs: [
        './test/specs/e2e-login.js'
    ],
    
    exclude: [
        // 'path/to/excluded/files'
    ],
    
    maxInstances: 5,
    
    capabilities: [{
        'os': 'Windows',
        'os_version': '10',
        'browser': 'Chrome',
        'browser_version': '81.0',
        'resolution': '1280x800',

        'project': 'WebdriverIO Samples',
        'build': 'Build v2'
    }, {
        'os': 'Windows',
        'os_version': '10',
        'browser': 'IE',
        'browser_version': '11.0',
        'resolution': '1280x800',

        'project': 'WebdriverIO Samples',
        'build': 'Build v2'
    }, {
        'os': 'Windows',
        'os_version': '10',
        'browser': 'Firefox',
        'browser_version': '76.0',
        'resolution': '1280x800',

        'project': 'WebdriverIO Samples',
        'build': 'Build v2'
    }, {
        'os': 'Windows',
        'os_version': '10',
        'browser': 'Edge',
        'browser_version': '81.0',
        'resolution': '1280x800',
        'browserstack.use_w3c': true,

        'project': 'WebdriverIO Samples',
        'build': 'Build v2'
    }, {
        'os': 'OS X',
        'os_version': 'Catalina',
        'browser': 'Safari',
        'browser_version': '13.0',
        'resolution': '1280x960',

        'project': 'WebdriverIO Samples',
        'build': 'Build v2'
    }
],
    
    logLevel: 'info',

    bail: 0,

    baseUrl: 'http://localhost',

    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,

    services: ['browserstack'],
    
    framework: 'mocha',
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },
    
    reporters: ['spec']
}
