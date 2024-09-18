function getNotionData() {
    var NOTION_ACCESS_TOKEN = PropertiesService.getScriptProperties().getProperty('Notion_api');
    var NOTION_DATABASE_ID = PropertiesService.getScriptProperties().getProperty('Notion_databaseId');
  
    var url = 'https://api.notion.com/v1/databases/' + NOTION_DATABASE_ID + '/query';
    var headers = {
      'Authorization': 'Bearer ' + NOTION_ACCESS_TOKEN,
      'Notion-Version': '2021-05-13',
      'Content-Type': 'application/json'
    };
  
    var options = {
      'method': 'post',
      'headers': headers,
      'muteHttpExceptions': true
    };
  
    var response = UrlFetchApp.fetch(url, options);
  
    if (response.getResponseCode() !== 200) {
      Logger.log('Error: ' + response.getContentText());
      throw new Error('Network response was not ok: ' + response.getContentText());
    }
  
    var data = JSON.parse(response.getContentText());
    Logger.log(data);
  
    var results = data.results;
    var links = [];
  
    results.forEach(function(page) {
      var properties = page.properties;
      if (properties.ステータス && properties.ステータス.status.name === '未着手' && properties.URL && properties.URL.url) {
        links.push(properties.URL.url);
      }
    });
  
    Logger.log('Links: ' + links);
    return links;
  }