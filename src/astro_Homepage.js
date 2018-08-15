const chalk = require("chalk")
const red = chalk.red
const yellow = chalk.yellow
const green = chalk.green
const chai = require("chai")
const chaiHttp = require("chai-http")
chai.use(chaiHttp)

module.exports = {
    'homepage' : function(browser){
        var home_page = browser.page.homepage_POM()
        home_page.navigate()
        home_page.waitForElementVisible('@page_body',1000)
        //Note : Firefox doesn't support webdriver logs : https://github.com/mozilla/geckodriver/issues/330#issuecomment-259763286
        //
        //Checks for browser errors
        if (process.env.npm_lifecycle_event != null && process.env.npm_lifecycle_event !== "firefox") {
            browser.getLog('browser',function(logs){
                logs.forEach(function (log){
                    if (log.level === "SEVERE") {
                        console.log(red('[' + log.level + '] ' + log.timestamp + ' : ' + log.message))
                    }
                })
            })
        }
        // Verifies whether the page loads with 5 seconds or not after Ads
        home_page.waitForElementVisible('@page_body',5000)

        // Check if Ads are available on Homepage
        browser.elements('css selector', '#STO-Pop', function(result){
            if (result.value.length == 0) {
                // Ads not Available
                console.log(yellow(" ** Ads not available. Ads are not visible on Homepage"))
            } else {
                // If Ads available, Hide them and proceed
                console.log(green("Removing Ads from Homepage"))
                home_page.remove_ad_modal()
            }
        })
        //Verify HTML fully loaded or not by acessing the footer elements
        home_page.verify.visible('@page_body')
        home_page.verify.visible('@footer')
        home_page.verify.visible('@sitemap')
        home_page.verify.visible('@privacy_policy')
        home_page.verify.visible('@privacy_notice')
        home_page.verify.visible('@term_of_use')
        home_page.verify.visible('@terms_and_conditions')
        home_page.verify.visible('@footer_image')

        // Get All Links
        browser.elements('css selector', 'a', function(result) {
            const elements = result.value
            for(var i in elements) {
                // Check for all Links
            browser.elementIdAttribute(elements[i].ELEMENT, 'href', function(link) {
                if (link.value != null) {
                    browser.perform(function (client, done) {
                        // Request Link
                        chai.request(link.value)
                        .get("")
                        .set('Accept-Encoding', 'gzip')  //Some Files were gziped hence set "Accept_Encoding" the header
                        .end(function (err, res) {
                            client.verify.responseShouldBeValid(res, err, link.value)
                            done()
                        })
                    })
                }
            })
            }
        })
        browser
        .end()

    }
}
