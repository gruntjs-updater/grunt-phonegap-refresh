/*global require, describe, it*/
var fs = require("fs"),
    assert = require("assert");

describe("phonegap_refresh", function () {

    it("Copies Assets To Their Destination", function () {
        assert(fs.existsSync("tests/phonegap/dev/www/test.html"));
    });

    it("Maintains Asset Directory Structure", function () {
        assert(fs.existsSync("tests/phonegap/dev/www/css/test.css"));
    });

    it("Copies Assets To An IOS Platform Destination", function () {
        assert(fs.existsSync("tests/phonegap/dev/platforms/ios/www/test.html"));
    });

    it("Copies iOS Icons To Their Destination", function () {
        assert(fs.existsSync("tests/phonegap/dev/platforms/ios/Test App/Resources/icons/icon_13604.png"));
    });

    it("Copies iOS Splash Screens To Their Destination", function () {
        assert(fs.existsSync("tests/phonegap/dev/platforms/ios/Test App/Resources/splash/icon_51417.png"));
    });

    it("Copies Assets To An Android Platform Destination", function () {
        assert(fs.existsSync("tests/phonegap/dev/platforms/android/assets/www/test.html"));
    });

    it("Copies Android Icons To Their Destination", function () {
        assert(fs.existsSync("tests/phonegap/dev/platforms/android/res/drawable/icon_13604.png"));
    });

    it("Copies Android Splash Screens To Their Destination", function () {
        assert(fs.existsSync("tests/phonegap/dev/platforms/android/res/drawable/icon_51417.png"));
    });

});