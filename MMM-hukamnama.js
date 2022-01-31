Module.register('MMM-hukamnama', {

    defaults: {
            show_all:   true,
            interval:   31200000 // Every 520 mins
    },

    start:  function() {
        Log.log('Starting module: ' + this.name);
        // Set up the local values, here we construct the request url to use
        this.loaded = false;
        this.url = 'https://api.gurbaninow.com/v2/hukamnama/today';
        Log.log('Using API: ' + this.url)
        this.result = null;

        // Trigger the initial request        
       this.getHukamnamaStatusData(this);
       
        },

    getStyles: function() {
        return ['hukamnama.css'];
        },


    getHukamnamaStatusData: function(that) {
        // Make the first request to the helper to set up the timer to perform the updates
        that.sendSocketNotification('GET-HUKAMNAMA', that.url);
        setTimeout(that.getHukamnamaStatusData, that.config.interval, that);
        },


    getDom: function () {
        
        var wrapper = document.createElement('div');
        
        wrapper.className = 'hukamnamastatus bright';
        
        var hukamnamaArray = this.result.hukamnama;
        var hukamnamaInfo = this.result.hukamnamainfo;
        var hDate = this.result.date;
        
        var hukamnamaDate = hDate.gregorian.day + ' ' + hDate.gregorian.month +
        ' ' + hDate.gregorian.date + 'th ' + hDate.gregorian.year;
        
        var title = hukamnamaDate + ' ' + hukamnamaInfo.source.english
        + ' ' + hukamnamaInfo.writer.english + ' ' + hukamnamaInfo.raag.raagwithpage;
    
        
            if (this.loaded) {
            if (this.result !== null) {
                hukamnamaResults = document.createElement('table');
                hukamnamaResults.className = 'hukamnamastatus bright';
        
                lineTop = document.createElement('tr');
                lineTop.innerHTML = title;
                
                hukamnamaResults.appendChild(lineTop);
                
                for (var i=0; i < hukamnamaArray.length; i++) {
                                        
                    lineRow1 = document.createElement('tr');
                    lineRow1.innerHTML = this.result.hukamnama[i].line.gurmukhi.unicode;
                   
                    lineRow2 = document.createElement('tr');
                    lineRow2.innerHTML = this.result.hukamnama[i].line.translation.english.default;
                   
                    hukamnamaResults.appendChild(lineRow1); 
                    hukamnamaResults.appendChild(lineRow2);

                }
            }
            wrapper.appendChild(hukamnamaResults);
        }
        return wrapper;
    },


    socketNotificationReceived: function(notification, payload) {
        if (notification === 'GOT-HUKAMNAMA' && payload.url === this.url) {
                this.loaded = true;
                this.result = payload.result;
                this.updateDom(1000);
            }
        }
    });
