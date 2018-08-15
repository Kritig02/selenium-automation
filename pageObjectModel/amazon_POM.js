const searchCommands = {
    submit : function() {
        this.waitForElementPresent('@submitButton')
          .click('@submitButton')    
        return this;
      }
}

const sort_by_commands = {
    click_sort_by : function (){
        this.waitForElementPresent('@amazon_sort_by')
        .click('@amazon_sort_by')
        return this;
    },
    click_low_to_high : function(){
        this.waitForElementPresent('@ascending')
        .click('@ascending')
        return this;
    }
}


module.exports = {
    url : 'https://www.amazon.com/',
    commands: [searchCommands,sort_by_commands],
    elements : {
        searchBar : {
            selector : 'input[id=twotabsearchtextbox]' 
        },
        submitButton : {
            selector : '.nav-search-submit > input:nth-child(2)'
        }, 
        amazon_sort_by : {
            selector : '#sort'
        },
        ascending : {
            selector : '#sort > option:nth-child(3)'
        },
        result_view : {
            selector : '#s-results-list-atf'
        },


    }
}