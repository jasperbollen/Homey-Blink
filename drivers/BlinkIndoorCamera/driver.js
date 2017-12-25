// Driver.js
'use strict';

const Homey = require('homey');

class BlinkDriver extends Homey.Driver {

    onInit() {
        new Homey.FlowCardAction('turn_on')
            .register()
            .registerRunListener(args => args.IndoorCamera_on.onFlowCardIndoorCamera_on());

        new Homey.FlowCardAction('turn_off')
            .register()
            .registerRunListener(args => args.IndoorCamera_off.onFlowCardIndoorCamera_off());

        new Homey.FlowCardAction('Capture_video')
            .register()
            .registerRunListener(args => args.Capture_vid.onFlowCardCapture_vid());

        new Homey.FlowCardAction('Capture_snapshot')
            .register()
            .registerRunListener(args => args.Capture_snap.onFlowCardCapture_snap());

        new Homey.FlowCardAction('Change_setting')
            .register()
            .registerRunListener(args => args.change_setting.onFlowCardSettings(args));

    }


    async onPairListDevices(data, callback) {
        let devices = await Homey.app.GetCameras();
        console.log(devices);
        callback(null, devices);
    }

    ParseTriggerData(DeviceIDp, DateString) {
        const device = this.getDevice({
            id: DeviceIDp
        });
        if (Object.prototype.hasOwnProperty.call(device, '_events')) {
            device.MotionDetected(DateString);
        }
        else{
          console.log("Unknown device: " +DeviceIDp);
          //device.MotionDetected(DateString);
        }
    }

}

module.exports = BlinkDriver;
