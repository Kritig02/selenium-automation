module.exports = {
    rNum : function(){
        return Math.floor(100000000 + Math.random() * 900000000);
    },
    rChar : function(){
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < 5; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
            return text;
    }
}