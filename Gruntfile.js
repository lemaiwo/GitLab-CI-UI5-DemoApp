/* global process:true */
"use strict";
//var rfc = require("node-rfc");
module.exports = function (grunt) {
	// Variables from environment
	// var nexusUser = process.env.NEXUS_DEPLOY_USER;
	// var nexusPassword = process.env.NEXUS_DEPLOY_PASSWORD;
	// var nexusSnapshotRepoURL = process.env.NEXUS_SNAPSHOT_REPO;
	grunt.log.write("test:");
	grunt.log.write(process.env.ABAP_APPLICATION_NAME);

	// Project properties
	var webAppDir = "webapp";
	var targetDir = "dist";
	var preloadPrefix = "be/wl/DemoMulitLabels";
	var namespace = "be.wl.DemoMulitLabels";
	var abapDevelopmentUser = process.env.ABAP_DEVELOPMENT_USER;
	var abapDevelopmentPassword = process.env.ABAP_DEVELOPMENT_PASSWORD;
	var abapDevelopmentServerHost = process.env.ABAP_DEVELOPMENT_SERVER_HOST;
	var abapApplicationName = process.env.ABAP_APPLICATION_NAME;
	var abapApplicationDesc = process.env.ABAP_APPLICATION_DESC;
	var abapPackage = process.env.ABAP_PACKAGE;
	var gitCommit = process.env.CI_COMMIT_TITLE;
	var resourceroots = {};
	resourceroots[namespace] = './base';
	var preprocessorsWebAppDir = {};
	preprocessorsWebAppDir['{' + webAppDir + ',' + webAppDir + '/!(test)}/*.js'] = ['coverage'];

	// Project configuration.
	// grunt.initConfig({
	var config = {
		eslint: {
			options: {
				configFile: ".eslintrc.js"
			},
			target: [webAppDir + "/**/*.js"]
		},
		nwabap_ui5uploader: {
			options: {
				conn: {
					server: abapDevelopmentServerHost
				},
				auth: {
					user: abapDevelopmentUser,
					pwd: abapDevelopmentPassword
				}
			},
			upload_build: {
				options: {
					ui5: {
						package: abapPackage,
						bspcontainer: abapApplicationName,
						bspcontainer_text: abapApplicationDesc,
						create_transport: true,
						transport_use_user_match: true,
						transport_text: gitCommit
					},
					resources: {
						cwd: targetDir,
						src: "**/*.*"
					}
				}
			}
		},
		karma: {
			options: {
				// base path that will be used to resolve all patterns (eg. files, exclude)
				client: {
					openui5: {
						config: {
							theme: 'sap_belize',
							language: 'EN',
							bindingSyntax: 'complex',
							compatVersion: 'edge',
							preload: 'async',
							resourceroots: resourceroots
						},
						tests: [
							preloadPrefix + '/test/unit/allTests',
						]
					}
				},
				browserNoActivityTimeout: '30000',
				frameworks: ['qunit', 'openui5'],
				openui5: {
					path: "https://<<your-gateway-system>>/sap/public/bc/ui5_ui5/1/resources/sap-ui-core.js" // eslint-disable-line
				},
				files: [{
					pattern: '**',
					included: false,
					served: true,
					watched: true
				}],
				reporters: ['progress'],
				port: 9876,
				logLevel: 'DEBUG',
				browserConsoleLogOptions: {
					level: 'warn'
				},
				browsers: ['Chrome'],
				coverageReporter: {
					includeAllSources: true,
					reporters: [{
						type: 'html',
						dir: '../coverage/'
					}, {
						type: 'text'
					}],
					check: {
						each: {
							statements: 100,
							branches: 100,
							functions: 100,
							lines: 100
						}
					}
				}
			},
			src: {
				basePath: webAppDir,
				singleRun: true,
				browsers: ['PhantomJS'],
				preprocessors: preprocessorsWebAppDir,
				reporters: ['progress', 'coverage']
			}
		}
	}; //);

	grunt.loadNpmTasks("grunt-eslint");
	grunt.loadNpmTasks("grunt-nwabap-ui5uploader");
	grunt.loadNpmTasks("@sap/grunt-sapui5-bestpractice-build");

	grunt.loadNpmTasks('grunt-openui5');
	grunt.loadNpmTasks('grunt-karma');

	grunt.config.merge(config);

	grunt.registerTask("check-lint", "Check validation", function () {
		var validation = grunt.file.readJSON(targetDir + "/di.code-validation.core_issues.json"),
			hasErrors = false;
		for (var check in validation.results) {
			grunt.log.writeln("Result for: " + check);
			for (var file in validation.results[check].issues) {
				validation.results[check].issues[file].forEach(function (error) {
					if (error.severity === "error") {
						grunt.log.error(error.path + "(" + error.line + "," + error.column + ") : " + error.message).error();
						hasErrors = true;
					}
				});
			}
		}
		if (hasErrors) {
			grunt.fail.warn('Errors found during code validation');
		}
	});

	grunt.registerTask('unit-test', ['karma:src']);
	grunt.registerTask("fiori-test", ["lint", "check-lint"]);
	grunt.registerTask("buildapp", ["build"]);
	grunt.registerTask("deploy", ["nwabap_ui5uploader"]);
};