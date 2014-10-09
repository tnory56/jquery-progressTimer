/**
 * Created by thomas.c.norberg on 4/24/14.
 */
module.exports = function (grunt) {
    "use strict";

    // Force use of Unix newlines
    grunt.util.linefeed = "\n";

    RegExp.quote = function (string) {
        return string.replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&");
    };
    // If you want to add the grunt css/js to another view change it here
    var distDir = "dist/",
        demoDir = "demo/",
        srcDir = "src/",
        bowerDir = "bower_components/",
        staticJsFile = demoDir + "js/static.js",
        staticMinJsFile = demoDir + "js/static.min.js",
        staticCssFile = demoDir + "css/static.css",
        staticMinCssFile = demoDir + "css/static.min.css";
    // 1. All configuration goes here
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        pkgName: "<%= pkg.name.replace(/-/, \".\") %>",
        banner: "/**!\n" +
            " * <%= pkg.title || pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today(\"m/d/yyyy\") %>\n" +
            " * <%= pkg.homepage %>\n" +
            " * Copyright (c) <%= grunt.template.today(\"yyyy\") %> <%= pkg.author.name %>;\n" +
            " * Licensed <%= _.pluck(pkg.licenses, \"type\").join(\", \") %>\n" +
            " */\n",
        concat: {
            options: {
                //banner: "<%= banner %>\n",
                stripBanners: false
            },
            // 2. Configuration for concatenating files goes here.
            staticjs: {
                src: [
                    bowerDir + "jquery/dist/jquery.js",
                    bowerDir + "bootstrap/dist/js/bootstrap.js"
                ],
                dest: staticJsFile
            },
            staticcss: {
                src: [
                    bowerDir + "bootstrap/dist/css/bootstrap.css",
                    bowerDir + "bootstrap/dist/css/bootstrap-theme.css"
                ],
                dest: staticCssFile
            },
            css: {
                src: [
                    [srcDir + "css/*.css"]
                ],
                dest: distDir + "css/<%= pkgName %>.css"
            },
            js: {
                src: [
                    [srcDir + "js/*.js"]
                ],
                dest: distDir + "js/<%= pkgName %>.js"
            }
        },
        cssmin: {
            css: {
                files: [
                    {
                        src: "<%= concat.css.dest %>",
                        dest: distDir + "css/<%= pkgName %>.min.css"
                    },
                    {
                        src: "<%= concat.staticcss.dest %>",
                        dest: staticMinCssFile
                    }
                ]
            }
        },
        uglify: {
            js: {
                files: [
                    {
                        src: "<%= concat.js.dest %>",
                        dest: distDir + "js/<%= pkgName %>.min.js"
                    },
                    {
                        src: "<%= concat.staticjs.dest %>",
                        dest: staticMinJsFile
                    }
                ]
            }
        },
        copy: {
            main: {
                files: [
                    // includes files within path
                    {
                        expand: true,
                        src: [ bowerDir + "bootstrap/dist/fonts/*"],
                        dest: demoDir + "fonts/",
                        filter: "isFile",
                        flatten: true
                    },
                    {
                        expand: true,
                        src: [ srcDir + "img/*"],
                        dest: demoDir + "img/",
                        filter: "isFile",
                        flatten: true
                    },
                    {
                        expand: true,
                        src: bowerDir + "respond/dest/respond.min.js",
                        dest: demoDir + "js/",
                        filter: "isFile",
                        flatten: true
                    }
                ]
            }
        },
        usebanner: {
            dist: {
                options: {
                    position: "top",
                    banner: "<%= banner %>"
                },
                files: {
                    src: [
                        "<%= concat.js.dest %>",
                        "<%= concat.css.dest %>",
                        "<%= uglify.js.files[0].dest %>",
                        "<%= uglify.js.files[1].dest %>",
                        "<%= cssmin.css.files[0].dest %>",
                        "<%= cssmin.css.files[1].dest %>"
                    ]
                }
            }
        },
        clean: [distDir + "*", demoDir + "/css/*", demoDir + "/js/*", demoDir + "/fonts/*"],
        jshint: {
            // You get to make the name
            // The paths tell JSHint which files to validate
            myFiles: ["src/js/**/*.js"]
        },
        bump: {
            options: {
                files: ["package.json", "bower.json"]
            },
            scripts: {
                files: ["dist/*", "src/*", "demo/*", "package.json", "bower.json", "GruntFile.js"],
                updateConfigs: ["pkg"],
                commitFiles: ["-a"],
                push: true,
                pushTo: "<%= pkg.respository.url =>"
            }
        },
        jsdox: {
            generate: {
                options: {
                    contentsEnabled: true,
                    contentsTitle: "Example Documentation",
                    contentsFile: "readme.md"//,
                    ///pathFilter: /^example/
                },
                src: ["src/js/*"],
                dest: "md"
            }//,
            // [optional additional "generation" task like generate above, can be targed with jsdox:generate-other-docs],
            /*publish: {
                enabled: true,
                path: "<%= jsdox.generate.dest %>",
                message: "Markdown Auto-Generated for version <%= pkg.version %>",
                remoteName: "upstream",
                remoteBranch: "master"
            }*/
        }/* Need to install grunt-sed but current version does not support exclude,
         sed: {
         versionNumber: {
         pattern: (function () {
         var old = grunt.option("oldver");
         return old ? RegExp.quote(old) : old;
         })(),
         replacement: grunt.option("newver"),
         recursive: true,
         exclude:["node_modules","bower_components"]
         }
         }*/
    });

    // 3. Where we tell Grunt we plan to use this plug-in.
    // measures the time each task takes
    require("time-grunt")(grunt);

    // load grunt config
    require("load-grunt-tasks")(grunt, {scope: "devDependencies"});

    grunt.registerTask("dev-js", ["newer:jshint:myFiles", "newer:concat:staticjs", "newer:concat:js", "newer:uglify:js"]);

    grunt.registerTask("dist-js", ["jshint:myFiles", "concat:staticjs", "concat:js", "uglify:js"]);

    grunt.registerTask("dev-css", ["newer:concat:staticcss", "newer:concat:css", "newer:cssmin:css"]);

    grunt.registerTask("dist-css", ["concat:staticcss", "concat:css", "cssmin:css"]);

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.
    grunt.registerTask("default", ["dev-js", "dev-css", "newer:copy:main"]);

    grunt.registerTask("dist", ["clean", "dist-js", "dist-css", "copy:main", "usebanner:dist"]);

    // Version numbering task.
    // grunt change-version-number --oldver=A.B.C --newver=X.Y.Z
    // This can be overzealous, so its changes should always be manually reviewed!
    //grunt.registerTask("change-version-number", "sed");
};



