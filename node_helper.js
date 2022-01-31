var NodeHelper = require("node_helper");
const request = require('request');

module.exports = NodeHelper.create({
    start: function () {
        console.log('MMM-hukamnama helper, started...');
        this.result = null;
        },

     getHukamnamaData: function(payload) {

        var that = this;
        this.url = payload;

        request({url: this.url, method: 'GET'}, function(error, response, body) {

            var result = JSON.parse(body);

            if (!error && response.statusCode == 200) {
                that.result = result;
            } else {
                that.result = null;
                }

            // We have the response figured out so lets fire off the notifiction
            that.sendSocketNotification('GOT-HUKAMNAMA', {'url': that.url, 'result': that.result});
            });
        },

     socketNotificationReceived: function(notification, payload) {
        if (notification === 'GET-HUKAMNAMA') {
            this.getHukamnamaData(payload);
            }
        },

});
