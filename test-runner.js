// run with npm test
// or npm --feature=featureFileName test
// for only running specific feature

let whatFeature = process.env.npm_config_feature;
if (whatFeature && !whatFeature.includes('.feature')) {
    whatFeature += '.feature';
}

let toRun = `./node_modules/selenium-cucumber-js/index.js`

process.argv.push('-b', 'phantomjs')
if (whatFeature) {
    process.argv.push('-f', 'features/' + whatFeature);
}
require(toRun);