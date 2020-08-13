'use strict';

Module.register('news_rss', {
  _defaults: {
    url: 'https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml',
  },

  // _getStyles: function(){},
  // _getScripts: function(){},
  _getTemplateData: function(){
    console.log('RSS CONFIG', this.data.config)
    fetch(this.data.config.url)
      .then(response => response.text())
      .then(string => new window.DOMParser().parseFromString(string, 'text/xml'))
      .then(data => console.log(data))
  }
})