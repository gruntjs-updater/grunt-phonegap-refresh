/*global module, require, grunt, console*/
module.exports = function (grunt) {

    // show elapsed time at the end
    require('time-grunt')(grunt);

    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-simple-mocha");
    grunt.loadNpmTasks("grunt-newer");
    grunt.loadTasks("tasks");

    grunt.initConfig({

        pkg : grunt.file.readJSON("package.json"),

        phonegap_refresh : {
            test : {
                options : {
                    path : 'tests/phonegap/dev',
                    platforms : ['ios', 'android'],
                    refreshSource : true,
                    appName : 'Test App',
                    icons : {
                        ios : 'tests/app/icons',
                        android : 'tests/app/icons'
                    },
                    splash : {
                        ios : 'tests/app/splash',
                        android : 'tests/app/splash'
                    },
                    assets : 'tests/app/assets'
                }
            }
        },

        simplemocha: {
            test: {
                src: "tests/*.js"
            }
        },

        clean : {
            test : {
                files : [{
                    dot : true,
                    src : [
                        '/tests/phonegap/dev/www',
                        '/tests/phonegap/dev/platforms/ios/www',
                        '/tests/phonegap/dev/platforms/ios/Resources/icons/',
                        '/tests/phonegap/dev/platforms/ios/Resources/splash/',
                        '/tests/phonegap/dev/platforms/android/assets/www',
                        '/tests/phonegap/dev/platforms/android/res/drawable/'
                    ]
                }]
            }
        },

        //automatic version control
        bump: {
            options: {
                files: ['package.json'],
                updateConfigs: ['pkg'],
                commit: true,
                commitMessage: 'Release v%VERSION%',
                commitFiles: ['package.json'],
                createTag: true,
                tagName: 'v%VERSION%',
                tagMessage: 'Version %VERSION%',
                push: true,
                pushTo: 'upstream',
                gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d'
            }
        }

    });

    /*
     Generate a Tagged Release
     */
    grunt.registerTask(
        'release',
        'Creates and Publishes a Versioned Release. First arg is target, second arg allows for a specific version number.',
        function (target) {

            grunt.loadNpmTasks('grunt-bump');
            var shouldBump = !!target;

            if (!shouldBump) {
                grunt.log.warn('[WARNING] grunt:release – No arguments provided. Version will not be bumped.');
            }

            if (shouldBump && !~['patch', 'major', 'minor', 'prerelease', 'git'].indexOf(target)) {
                grunt.log.error('[ERROR] grunt:release – "' + target + '" is not a valid semver target for to bump.');
                return false;
            }

            if (shouldBump) {
                grunt.task.run(['bump-only:' + target]);
            }

            grunt.task.run([
                'bump-commit'
            ]);

        }
    );

    grunt.registerTask(
        'default',
        'Runs the Tests',
        function () {
            grunt.task.run([
                'clean:test',
                'phonegap_refresh:test',
                'simplemocha'
                //'clean:test'
            ]);
        }
    );

};
