const config = require('./gulpfile.js/config');
const exec = require('child_process').exec;

// stylelint
exec('stylelint --fix \'' + config.styles.src + '\'', (err, stdout, stderr) => {
  console.log('\n\n==============================');
  console.log('Exec - stylelint');
  console.log('==============================');
  console.log(stdout);
  console.log('Complete');
  console.log('--------');
});

// eslint
exec('eslint --fix \'' + config.scripts.src + '\'', (err, stdout, stderr) => {
  console.log('\n\n==============================');
  console.log('Exec - eslint');
  console.log('==============================');
  console.log(stdout);
  console.log('Complete');
  console.log('--------');
});

// html-validate
exec('html-validate \'' + config.browserSync.base + '/**/*.html\'', (err, stdout, stderr) => {
  console.log('\n\n==============================');
  console.log('Exec - html-validate');
  console.log('==============================');
  console.log(stdout);
  console.log('Complete');
  console.log('--------');
});
