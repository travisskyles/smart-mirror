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
    ]
  },

  _getTemplateData: function(){
    return this.config.messages.all;
  }
})