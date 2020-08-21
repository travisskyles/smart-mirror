'use strict';

Module.register('time_date', {
  _defaults: {
    updateInterval: 1000, // how often the module should update the dom in milliseconds
  },

  _getScripts: function(){
    return [
      dependencies['ejs'],
    ]
  },

  _getStyles: function(){
    return [
      'css/time_date.css',
    ]
  },

  _getTemplateData: function(){
    const epoch = new Date();
    const data = {
      time: epoch.toLocaleTimeString(),
      date: epoch.toLocaleDateString(),
    }

    return {data: data};
  },
});
