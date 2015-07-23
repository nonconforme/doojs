module.exports = function(grunt) {

	grunt.initConfig({
		jshint: {
			all: ["src/doo.js"]
		},
		uglify: {
			dist: {
				files: {
					"dist/doo.min.js": ["src/doo.js"]
				}
			}
		}
	});

	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-contrib-jshint");
	
	grunt.registerTask("default", ["jshint", "uglify"]);

};
