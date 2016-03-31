module.exports = function(grunt){
	
	grunt.initConfig({
		browserify: {
			js: {
		        src: 'app/app.js',
		        dest: 'js/app.js',
		        options: {
		          external: ['angular'],
		          debug: true,
		          browserifyOptions: { debug: true }
		        }
		    },
		},
		watch: {
			js: {
				files: ['app/**/*.js', 'app/app.js'],
				tasks: ['browserify']
			}
		},
	});
	
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.registerTask('default', ['browserify', 'watch' ]);	
}