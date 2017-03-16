Error.stackTraceLimit = Infinity;

//引入编译时所需的库文件
require('core-js/es6');
require('core-js/es7/reflect');

require('zone.js/dist/zone');
require('zone.js/dist/long-stack-trace-zone');
require('zone.js/dist/proxy');
require('zone.js/dist/sync-test');
require('zone.js/dist/jasmine-patch');
require('zone.js/dist/async-test');
require('zone.js/dist/fake-async-test');

//打包文件名后缀为spec.ts的测试代码
var appContext = require.context('../src', true, /\.spec\.ts/);

appContext.keys().forEach(appContext);

//用angular自身测试组件代替Jasmine
var testing = require('@angular/core/testing');
var browser = require('@angular/platform-browser-dynamic/testing');

testing.TestBed.initTestEnvironment(browser.BrowserDynamicTestingModule, browser.platformBrowserDynamicTesting());
