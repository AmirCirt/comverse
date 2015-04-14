module.exports = function (grunt) {
	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		md2html: {
			one_file: {
				options: {},
				files: [{
					src: ['outline.md'],
					dest: 'outline.html'
				}]
			}	
		},
		
		connect: {
			all: {
				options: {
					port: 80,
					base: '',
					livereload: true,
					keepalive: false,

					middleware: function(connect, options) {
						return [
						require('grunt-contrib-livereload/lib/utils').livereloadSnippet,
						connect.static(options.base[0])
						];
					}
				}
			}
		},

		watch: {
			js: {
				files: ['js/**/*.js'],
				tasks: ['livereload']
			},
			css: {
				files: ['css/**/*.css'],
				tasks:['livereload']
			},
			html: {
				files: ['**/*.html'],
				tasks:['livereload']
			}
		}
	});
	
	grunt.registerTask('default', ['connect', 'watch']);
	grunt.loadNpmTasks('grunt-md2html');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-watch');
};