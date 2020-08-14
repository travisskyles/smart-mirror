'use strict';

Module.register('news_rss', {
  _defaults: {
    updateInterval: 1000 * 3600,
    url: 'https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml',
    type: 'scrolling',
  },

  _getStyles: function(){
    return [
      'css/news_rss.css',
    ]
  },
  _getScripts: function(){
    return [
      'newsItem.js',
      dependencies['ejs'],
    ]
  },
  _getTemplateData: function(){
    const newsData = {
      type: this.data.config.type,
      data: [],
    }
    return fetch(this.data.config.url)
      .then(response => response.text())
      .then(string => new window.DOMParser().parseFromString(string, 'text/xml'))
      .then(data => {
        const items = data.querySelectorAll("item");
        items.forEach(item => {
          newsData.data.push(new NewsItem(item.children[0].textContent, item.children[4].textContent));
        })
        return { data: newsData };
      })
  }
})