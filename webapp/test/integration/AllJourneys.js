/* global QUnit*/

sap.ui.define([
	"sap/ui/test/Opa5",
	"be/wl/DemoMulitLabels/test/integration/pages/Common",
	"sap/ui/test/opaQunit",
	"be/wl/DemoMulitLabels/test/integration/pages/View1",
	"be/wl/DemoMulitLabels/test/integration/navigationJourney"
], function(Opa5, Common) {
	"use strict";
	Opa5.extendConfig({
		arrangements: new Common(),
		viewNamespace: "be.wl.DemoMulitLabels.view.",
		autoWait: true
	});
});