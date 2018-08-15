
const getLinkTitleElement = function(index) {
    return '#srp-river-results-listing' + index + ' > div:nth-child(1) > div:nth-child(2) > a:nth-child(2)'
}
const getPriceELement = function(index){
    return '#srp-river-results-listing' + index + ' > div > div.s-item__info.clearfix > div.s-item__details.clearfix > div:nth-child(1)'
    // return '#srp-river-results-listing' + index + ' > div:nth-child(1) > div:nth-child(2)' 
}

exports.command = function(index, callback) {
    var self = this
  
    var result = {}

    this.getText(getLinkTitleElement(index), function(title){
        result.title = title.value
    })
    .getText(getPriceELement(index), function(res){
        result.price = res.value
    })
    .getAttribute(getLinkTitleElement(index),'href',function(link){
        result.link = link.value
        callback.call(self, result)
    })
    return this
  }