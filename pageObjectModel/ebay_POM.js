const searchCommands = {
    submit : function() {
        this.waitForElementPresent('@submitButton')
          .click('@submitButton')    
        return this;
      }
}

const sort_by_commands = {
    click_sort_by : function (){
        this.waitForElementPresent('@ebay_sort_by')
        .moveToElement('css selector','#srp-river-results-SEARCH_STATUS_MODEL_V2-w0-w1_btn',1,1)
        return this;
    },
    click_low_to_high : function(){
        this.waitForElementPresent('@ascending')
        .click('@ascending')
        
        return this;
    }
}

module.exports = {
    url : 'https://www.ebay.com/',
    commands: [searchCommands,sort_by_commands],
    elements : {
        searchBar : {
            selector : '#gh-ac' 
        },
        submitButton : {
            selector : '#gh-btn'
        }, 
        ebay_sort_by : {
            selector : '#srp-river-results-SEARCH_STATUS_MODEL_V2-w0-w1_btn'
        },
        ascending : {
            selector : '.srp-sort__menu > li:nth-child(4) > a:nth-child(1)'
        },
        result_view : {
            selector : '#srp-river-results-listing2'
        }
    }
}
