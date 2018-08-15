
const tableify = require('tableify')
const path = require('path')
const fs = require('fs')
const opn = require('opn')
var amazonResults = []
var ebayResults = []

module.exports = {
    'Amazon Search' : function (browser) {
        var amazon_page = browser.page.amazon_POM()
        amazon_page.navigate()
        amazon_page.expect.element('@searchBar').to.be.present
        amazon_page.setValue('@searchBar', 'iPhone 7')
        amazon_page.submit()

        amazon_page.expect.element('@amazon_sort_by').to.be.visible
        amazon_page.click_sort_by()
        amazon_page.expect.element('@ascending').to.be.present
        amazon_page.click_low_to_high()

        amazon_page.verify.elementPresent('@result_view')
        // Waiting for all results to be loaded
        browser.pause(2000)
        // Get Result Items
        browser.elements('css selector','.s-result-item',function(card){
            const totalItems = card.value.length - 2
            // Iterate through items and parse results
            for (var i = 1; i< totalItems; i++) {
                browser.parseAmazonSearchResultItem(i, function(res) {
                    amazonResults.push(res)
                })
            }
        })
        browser.end()
    },
    'Ebay Search' : function (browser) {
        var ebay_page = browser.page.ebay_POM()
        ebay_page.navigate()
        ebay_page.expect.element('@searchBar').to.be.present
        ebay_page.setValue('@searchBar', 'iPhone 7')
        ebay_page.submit()

        ebay_page.expect.element('@ebay_sort_by').to.be.visible
        ebay_page.click_sort_by()
        ebay_page.expect.element('@ascending').to.be.visible
        ebay_page.click_low_to_high()

        ebay_page.verify.elementPresent('@result_view')
        // Get Result Items
        browser.elements('css selector','.s-item__image-img',function(card){
            const totalItems = card.value.length - 2
            // Iterate through items and parse results
            for (var i = 1; i< totalItems; i++) {
                browser.parseEbaySearchResultItem(i, function(res) {
                    ebayResults.push(res)
                })
            }
        })
        browser.end()
    },
    'Generate Reports': function (browser) {
        var results = {
            amazon: amazonResults,
            ebay: ebayResults
        }
        //Creating HTML Table for reporting
        var html = tableify(results)
        const css = fs.readFileSync(__dirname + '/../reporter/style.css')
        //Inserting Style sheet
        html = html + '<style>' + css + '</style>'
        const fileName = 'amazonEbayResult_' + new Date().getTime() / 1000 + '.html'
        //Setting File Path
        const filePath = path.join(__dirname, '..', 'reports', fileName)
        
        //Writes the file to the given path
        browser.perform(function (client, done) {
            fs.writeFile(filePath, html, function(err) {
                if(err) {
                    done()
                    return console.log(err)
                }
            
                console.log("Report was successfully generated file was saved!")
                // Open Report in browser
                opn(filePath, {wait: false})
                done()
            })
        }).end()
    }
}
