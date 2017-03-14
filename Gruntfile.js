module.exports = function(grunt){
    
    // Configure the main project settings
    
    grunt.initConfig({
        
       // Basic settings and info about our plugins
        
        pkg: grunt.file.readJSON('package.json'), 
        
        // Name of the plugin (plugin name without the grunt-contrib)
        
        cssmin :{
            combine :{
                files :{
                    'public/resources/dist/css/style.min.css' : ['public/resources/css/raw/**/*.css']
                }
                
            }
            
        } , 
        
        // Uglify 
        
        uglify :{
            dist :{
                files :{
                    //'resources/js/**/*.js'
                    'public/resources/dist/js/main-app.min.js' : ['public/resources/js/**/*.js']
                }
            }
            
        } , 
        
        less : {
            development : {
                files : {
                    'public/resources/css/raw/less-source.css' : ['public/resources/css/less/**/*.less']
                }
            }
        } , 
        
        watch: {
            less: {
                files: ['public/resources/css/less/**/*.less'],
                tasks: ['less']
            },
            js: {
                files: ['public/resources/js/**/*.js'],
                tasks: ['uglify']
            }, 
            css : {
                files: ['public/resources/css/raw/**/*.css'],
                tasks: ['cssmin']
            }
        }
     
    });
    
    
    //Load the plugin 
    
    grunt.loadNpmTasks('grunt-contrib-cssmin'); 
    grunt.loadNpmTasks('grunt-contrib-uglify'); 
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    
    
    // Do the task 
    
    grunt.registerTask('default',['watch','less','cssmin','uglify']);    
    
    
}; 