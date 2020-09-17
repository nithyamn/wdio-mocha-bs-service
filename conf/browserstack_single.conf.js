const sanityTests = [
    './test/specs/e2e-login.js',
    './test/specs/google.js'
];
exports.config = {

    runner: 'local',
    
    hostname: 'hub.browserstack.com',
    port: 443,
    protocol: 'https',
    path: '/wd/hub',
    
    user: process.env.BROWSERSTACK_USERNAME,
    key: process.env.BROWSERSTACK_ACCESS_KEY,
    
    // specs: [
    //     './test/specs/e2e-login.js'
    // ],
    specs: ['./test/specs/*.js'],
    suites: {
    sanity: sanityTests           
    },
    
    exclude: [
        // 'path/to/excluded/files'
    ],
    
    maxInstances: 10,
    
    capabilities: [{
        'os': 'Windows',
        'os_version': '10',
        'browser': 'Chrome',
        'browser_version': '81.0',
        'resolution': '1280x800',

        'project': 'WebdriverIO Samples',
        'build': 'Build v1'
    }],
    
    logLevel: 'info',

    bail: 0,

    baseUrl: 'http://localhost',

    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,

    //Comment out the Services section and run the tests again for the hooks of this test to get reflected.
    
    framework: 'mocha',
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },
    
    // reporters: ['spec', 'browserstack'],
    // reporterOptions: {
    //     browserstack: {
    //         outputDir: './'
    //     }
    // },
    reporters: [
        'spec',
        [
          'allure',
          {
            outputDir: './tests/reports/allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: false
          }
        ],
        [
          'junit',
          {
            outputDir: './tests/reports/junit',
            outputFileFormat: function(options) {
              return `junit-${options.capabilities.browserName}.${options.cid}.xml`;
            }
          }
        ],
        [
          'browserstack',
          {
            outputDir: './',
          }
        ]
    ],

    services: ['browserstack', 'intercept'],

     beforeSession: function (config, capabilities, specs) {
        var path = specs[0];
        var testname = path.replace(/^.*[\\/]/, '').replace(/.js/, '');
        var projectname = `_test_${new Date().toLocaleDateString()}`;

        //console.log("specs:"+testname);
        capabilities.name = testname;
        capabilities.project = projectname;

      },

    beforeTest: function (test, context, capabilities) {
        //const testName = "\"********Running Test:"+test.title+"*******\";"
        const testName = '"******** Running test: ' + test.title + ' *******";';
        browser.execute(testName)
        console.log('--- Running test: ' + testName)
    },

    afterTest: function (test,spec) {   

        var user = process.env.BROWSERSTACK_USERNAME;
        var key = process.env.BROWSERSTACK_ACCESS_KEY;
        const sessionid = browser.sessionId;

        const filename =  spec[0];
        //const projectname = `test_${new Date().toLocaleDateString()}`;
        console.log("Username, Accesskey : "+user+" "+key);
        var request = require('request');
        console.log("Session ID printed: "+sessionid);
        request({
            uri: "https://"+user+":"+key+"@api.browserstack.com/automate/sessions/"+sessionid+".json", 
            method:"PUT", 
            form:{"status":"failed"}
        })

        browser.executeScript('browserstack_executor: {"action": "setSessionName", "arguments": {"name": "Node test"}}');

        //GET PUBLIC SESSION URL
        opts = {
            url : "https://"+user+":"+key+"@api.browserstack.com/automate/sessions/"+sessionid+".json"
        };
        request.get(opts, function (error, response, body) {
            var jsonData = JSON.parse(body);

            console.log("PUBLIC SESSION URL:"+jsonData["automation_session"]["public_url"]);
        });
        
    }
}
