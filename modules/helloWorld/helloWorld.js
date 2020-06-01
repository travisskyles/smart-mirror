'use strict';

Module.register('helloWorld', {
  _defaults: {
    messages: {
      all: ['Hello World'],
    },
  },

  _getScripts: function(){
    return [
      dependencies['ejs'],
      'helloWorldTemplate.js',
      'helloWorld.ejs',
    ]
  },

  _getTemplateData: function(){
    return {message: this.config.messages.all};
  }
})