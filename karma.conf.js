module.exports = function(config) {
  config.set({

//    basePath: '',

    frameworks: ['qunit'],
    files: ['./test/*.js'],
    preprocessors: {
      'test/**/*.js': ['rollup'],
      'src/**/*.js': ['rollup']
    },
    rollupPreprocessor: {
      format: 'iife',
      moduleName: 'dom',
      sourceMap: 'inline'
    },
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_DEBUG,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher

    browsers: ['Chrome', 'Firefox'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
