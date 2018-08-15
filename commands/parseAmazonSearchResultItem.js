
const getLinkTitleElement = function(index) {
    return '#result_' + index + ' > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > a:nth-child(1)'
}
const getPriceElement = function(index){
    return '#result_' + index + ' > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1)'
}

exports.command = function(index, callback) {
    var self = this
  
    var result = {}

    this.getText(getLinkTitleElement(index), function(title){
        result.title = title.value
    })
    .getText(getPriceElement(index), function(res){
        result.price = res.value
    })
    .getAttribute(getLinkTitleElement(index),'href',function(link){
        result.link = link.value
        callback.call(self, result)
    })
    return this
  }