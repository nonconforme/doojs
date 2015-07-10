module.exports = function(grunt) {

	grunt.initConfig({
		uglify: {
			dist: {
				files: {
					"doo.js": ["dist/doo.min.js"]
				}
			}
		},
		jshint: {
			all: ["doo.js"]
		}
	});

	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-jshint");
	
	grunt.registerTasks("default", ["jshint", "uglify"]);

};
