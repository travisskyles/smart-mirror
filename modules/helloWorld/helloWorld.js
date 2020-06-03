'use strict';

Module.register('helloWorld', {
  _defaults: {
    updateInterval: 1000, // how often the module should update the dom in milliseconds
    messages: {
      all: ['Hello World', 0],
    },
  },

  _getScripts: function(){
    return [
      dependencies['ejs'],
    ]
  },

  _getTemplateData: function(){
    this.data.config.messages.all[1]++;
    return {messages: this.data.config.messages};
  },
});
