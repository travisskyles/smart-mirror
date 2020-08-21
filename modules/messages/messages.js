'use strict';

Module.register('messages', {
  _defaults: {
    updateInterval: 1000 * 60,
    apiTags: ['philosophy', 'inpirational', 'knowledge', 'reality', 'wisdom', 'history', 'famous'],
    messages: {
      quotes: [],
      morning: [
        'Good Morning',
        'Guten Morgen',
        'Buenos días',

      ],
      afternoon: [
        'Guten Tag',
        'Buenas Tardes',
        'Good Afternoon',

      ],
      evening: [
        'Good Evening',
        'Gute Nacht',
        'Buenas Noches',
      ],
    },
    appId: '',
  },

  _getStyles: function () {
    return [

    ]
  },

  _getScripts: function () {
    return [
      dependencies['ejs'],
      'messagesJson.js',
    ]
  },

  // COMMENTED OUT TO PREVENT OVERUSE OF API CALLS
  // _getTemplateData: async function(){
  //   const messageData = {
  //     messages: this.data.config.messages,
  //   }
  //   return fetch(`https://api.paperquotes.com/apiv1/quotes/?limit=500&tags=famous`, {
  //     headers: {
  //       'Authorization': `Token ${this.data.config.appId}`
  //     }
  //   })
  //     .then(response => response.json())
  //     .then(data => {
        

  //       data.results.forEach(item => {
  //         // if(!item.author) item.author = 'unknown';
  //         messageData.messages.quotes.push({
  //           author: item.author ? item.quote.slice(item.quote.lastIndexOf('.') + 2) : 'unknown',
  //           quote: item.quote.slice(0, item.quote.lastIndexOf('.') + 1)
  //         })
  //       })
  //       console.log(JSON.stringify(messageData.messages.quotes));
  //     })
  // }

  // temporary function to use stored data rather than api calls
  _getTemplateData: function(){
    const messages = {
      quotes: messageJsonData,
      morning: this.data.config.messages.morning,
      afternoon: this.data.config.messages.afternoon,
      evening: this.data.config.messages.evening,
    }

    let currentTime = new Date().toLocaleTimeString('en-GB').slice(0, 2);;
    let quoteMessage = messages.quotes[getIndex(messages.quotes.length - 1)];
    let timeMessage = setTimeMsg(currentTime);

    function getIndex(maximum) {
      return Math.floor(Math.random() * (maximum))
    }

    setInterval(() => {
      currentTime = new Date().toLocaleTimeString('en-GB').slice(0, 2);
      timeMessage = setTimeMsg(currentTime);
    }, 1000 * 3600)

    setInterval(() => {
      let index = getIndex(messages.quotes.length - 1);
      quoteMessage = messages.quotes[index]
    }, 1000 * 60)

    function setTimeMsg(hour) {
      if (hour >= 0 && hour < 12) {
        return messages.morning[getIndex(messages.morning.length - 1)]
      } else if (hour >= 12 && hour < 17) {
        return messages.afternoon[getIndex(messages.afternoon.length - 1)]
      } else if (hour >= 17 && hour < 24) {
        return messages.evening[getIndex(messages.evening.length - 1)]
      }
    }
    return {
      data: {
        quoteMessage: quoteMessage,
        timeMessage: timeMessage,
      }
    };
  }
})