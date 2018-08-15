var HtmlReporter = require('nightwatch-html-reporter');
var reporter = new HtmlReporter({
    openBrowser: true,
    reportsDirectory: __dirname + '/reports',
    themeName: 'compact',
    relativeScreenshots: true,
    uniqueFilename: true
});
module.exports = {
    reporter: reporter.fn
};