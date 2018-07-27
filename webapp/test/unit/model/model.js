/*global QUnit*/

sap.ui.define([
	"be/wl/DemoMulitLabels/model/models",
	"sap/ui/thirdparty/sinon",
	"sap/ui/thirdparty/sinon-qunit"
], function(model) {
	"use strict";

	//This module tests the main controller of the app. Add any other relevant tests.
	//For more information on Qunit, see https://sapui5.hana.ondemand.com/#/topic/09d145cd86ee4f8e9d08715f1b364c51
	QUnit.module("Test model");

	QUnit.test("I should test the device model is not empty", function(assert) {
		assert.strictEqual(!!model.createDeviceModel().getData(), true, "device model is filled");
	});

});