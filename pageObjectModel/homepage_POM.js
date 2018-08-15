const dispose_Ad_modal = {
    remove_ad_modal : function(){
        this.waitForElementVisible('@remove_ad',1000)
        .click('@remove_ad')
        return this;
    }
}

module.exports = {
    url : function() {
        return this.client.settings.launch_url
    },
    commands : [dispose_Ad_modal],
    elements : {
        page_body : {
            selector : '#Body',        
        },
        ad_modal : {
            selector : '#STO-Pop'
        },
        remove_ad : {
            selector : '#STO-Pop > section > div.dispose'
        },
        footer : {
            selector: '#acm_footer'
        },
        sitemap : {
            selector : '#acm_footer > div.bottomrow > div > section > a.sublink.first'
        },
        privacy_policy : {
            selector : '#acm_footer > div.bottomrow > div > section > a:nth-child(2)'
        },
        privacy_notice : {
            selector : '#acm_footer > div.bottomrow > div > section > a:nth-child(3)'
        },
        term_of_use : {
            selector : '#acm_footer > div.bottomrow > div > section > a:nth-child(4)'
        },
        terms_and_conditions : {
            selector : '#acm_footer > div.bottomrow > div > section > a:nth-child(5)'
        },
        footer_image : {
            selector : '#acm_footer > div.footerwrapper > div.column.last > section > a > img'
        }
    }
}