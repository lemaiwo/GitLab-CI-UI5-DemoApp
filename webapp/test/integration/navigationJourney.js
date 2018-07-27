/*global QUnit*/
sap.ui.define([
	"sap/ui/test/opaQunit",
	"be/wl/DemoMulitLabels/test/integration/pages/View1"
], function(opaTest) {
	"use strict";

	//This module tests that the app is loaded. Add any other relevant tests to check the UI of the app.
	//For more infromation on OPA, see https://sapui5.hana.ondemand.com/#/topic/2696ab50faad458f9b4027ec2f9b884d
	QUnit.module("Navigation Journey");

	opaTest("Should see the initial page of the app", function(Given, When, Then) {
		// Arrangements
		Given.iStartTheApp();

		//Actions
		When.onTheAppPage.iLookAtTheScreen();
		// Assertions
		Then.onTheAppPage.iShouldSeeTheApp();

		Then.iTeardownMyAppFrame();

	});

	//This is an exmaple of an OPA Journey that needs to be fixed 
	opaTest("Should check additinal UI elements", function(Given, When, Then) {
		// Arrangements
		Given.iStartTheApp();

		//Actions
		When.onTheAppPage.iDoMyAction();
		// Assertions
		Then.onTheAppPage.iDoMyAssertion();

		Then.iTeardownMyAppFrame();

	});
});