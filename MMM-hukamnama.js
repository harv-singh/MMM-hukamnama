Module.register('MMM-hukamnama', {

    defaults: {
            show_all:   true,
            interval:   600000 // Every 10 mins

    },

    start:  function() {
        Log.log('Starting module: ' + this.name);

        // Set up the local values, here we construct the request url to use
        this.loaded = false;
        this.url = 'https://api.gurbaninow.com/v2/hukamnama/today';
        this.result = null;

        // Trigger the first request
        this.getHukamnamaStatusData(this);
        },

    getStyles: function() {
        return ['hukamnama.css'];
        },


    getHukamnamaStatusData: function(that) {
        // Make the initial request to the helper then set up the timer to perform the updates
        that.sendSocketNotification('GET-HUKAMNAMA', that.url);
        setTimeout(that.getHukamnamaStatusData, that.config.interval, that);
        },


    getDom: function () {
        var wrapper = document.createElement('div');
        wrapper.className = 'tubeStatus bright';

        if (this.loaded) {
            if (this.result !== null) {
                hukamnamaResults = document.createElement('table');
                hukamnamaResults.className = 'tubeStatus bright';

                for (var i=0; i < this.result.length; i++) {
                    lineRow = document.createElement('tr');
                    lineName = document.createElement('td');
                    lineName.innerHTML = this.result.hukamnama[i].line.translation.english.default;
                    lineRow.appendChild(lineName);
                }
                hukamnamaResults.appendChild(lineRow);
            }
            wrapper.appendChild(hukamnamaResults);
        }
        return wrapper;
    },


    socketNotificationReceived: function(notification, payload) {
        // check to see if the response was for us and used the same url
        if (notification === 'GOT-HUKAMNAMA' && payload.url === this.url) {
                // we got some data so set the flag, stash the data to display then request the dom update
                this.loaded = true;
                this.result = payload.result;
                this.updateDom(1000);
            }
        }
    });
