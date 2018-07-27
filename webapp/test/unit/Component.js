/*global QUnit*/

sap.ui.define([
	"be/wl/DemoMulitLabels/Component",
	"sap/ui/thirdparty/sinon",
	"sap/ui/thirdparty/sinon-qunit"
], function(Component) {
	"use strict";

	//This module tests the main controller of the app. Add any other relevant tests.
	//For more information on Qunit, see https://sapui5.hana.ondemand.com/#/topic/09d145cd86ee4f8e9d08715f1b364c51
	QUnit.module("Test component");
	
	QUnit.test("I should test the app component loads", function(assert) {
		var oComponent = new Component();
		
		assert.strictEqual(!!oComponent, true, "component");
	});

});