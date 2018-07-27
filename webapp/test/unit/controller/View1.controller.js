/*global QUnit*/

sap.ui.define([
	"sap/ui/base/ManagedObject",
	"sap/ui/core/mvc/Controller",
	"be/wl/DemoMulitLabels/controller/View1.controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/thirdparty/sinon",
	"sap/ui/thirdparty/sinon-qunit"
], function(ManagedObject, Controller, oController, JSONModel) {
	"use strict";

	//This module tests the main controller of the app. Add any other relevant tests.
	//For more information on Qunit, see https://sapui5.hana.ondemand.com/#/topic/09d145cd86ee4f8e9d08715f1b364c51
	QUnit.module("View1 Controller", {

		beforeEach: function() {

			this.oController = new oController();
			this.oViewStub = new ManagedObject({});
			sinon.stub(Controller.prototype, "getView").returns(this.oViewStub);

			this.oJSONModelStub = new JSONModel({});
			this.oViewStub.setModel(this.oJSONModelStub);
		},

		afterEach: function() {
			Controller.prototype.getView.restore();

			this.oViewStub.destroy();
		}
	});

	QUnit.test("I should test the app controller loads", function(assert) {
		var oAppController = new oController();
		var sName = oAppController.getMetadata().getName();
		assert.ok(sName, "be/wl/DemoMulitLabels.controller.View1");
	});

	//this is an exmaple of a Qunit that needs to be fixed 
	QUnit.test("I should test any additinal controls", function(assert) {
		assert.ok(true, "Implement test");
	});

	QUnit.test("Check if model has labels after Init", function(assert) {
		// Arrange
		// initial assumption: to-do list is empty
		assert.strictEqual(!this.oController.getView().getModel().getObject('/labels'), true, "There should be no Labels defined.");

		// Act
		this.oController.onInit();

		// Assumption

		assert.strictEqual(!!this.oController.getView().getModel().getObject('/labels'), true, "There should be Labels defined.");
	});
	QUnit.test("Check if model has labels after add label", function(assert) {
		// Arrange
		// initial assumption: to-do list is empty
		assert.strictEqual(!this.oController.getView().getModel().getObject('/labels'), true, "There should be Labels defined.");

		// Act
		this.oController.onAddLabel();

		// Assumption

		assert.strictEqual(!!this.oController.getView().getModel().getObject('/labels'), true, "There should be Labels defined.");
	});

});