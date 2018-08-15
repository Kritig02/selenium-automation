
exports.assertion = function(response, err, link) {

    this.message = "Asserting that url : " + link + " should have response code as 200"
  
    this.expected = 200
    this.pass = function(value) {
        if (value == 200) {
            return true
        }
        return false
    };
  
    this.value = function(response) {
        if (response != null && response.status != null) {
            if (response.status == 200) {
                return 200
            } else {
                console.log(response)
                console.log(err)
                return response.status
            }
        } else if (err != null) {
            return err
        } else {
            console.log(response)
            console.log(err)
            return 404
        }
    };
  
    this.command = function(callback) {
        callback(response)
      return this;
    };
  
  };