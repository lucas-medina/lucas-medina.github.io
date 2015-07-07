module.exports = function(grunt) {

	grunt.initConfig({

		connect : {
			server : {
				options : {
					port : 8080,
					open : {
						target : 'http://localhost:8080'
					}
				}
			}
		},

		sass : {
			dist : {
				options : {
					style : 'compact'
				},
				files : {
					'build/css/main.css' : 'src/sass/style.scss' 
				}
			}
		},

		watch : {
			css : {
				files : 'src/sass/*.scss',
				tasks : ['sass'],
				options : {
					livereload : true
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');

	grunt.registerTask('default', ['sass']);
	grunt.registerTask('update', ['connect', 'watch']);

	
}