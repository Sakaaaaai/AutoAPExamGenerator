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
  
  function getRandomElements(arr, num) {
    var result = new Array(num),
        len = arr.length,
        taken = new Array(len);
    if (num > len)
      throw new RangeError("getRandomElements: more elements taken than available");
    while (num--) {
      var x = Math.floor(Math.random() * len);
      result[num] = arr[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
  }
  
  function formatLinksAsMarkdown(links) {
    return links.map(function(url, index) {
      return `[問題 ${index + 1}](${url})`;
    }).join('\n');
  }
  
  function sendToDiscordBot(message) {
    var webhookUrl = PropertiesService.getScriptProperties().getProperty('Discord_webhookUrl');
  
    var payload = JSON.stringify({
      'content': message
    });
  
    var options = {
      'method': 'post',
      'headers': {
        'Content-Type': 'application/json'
      },
      'payload': payload,
      'muteHttpExceptions': true
    };
  
    var response = UrlFetchApp.fetch(webhookUrl, options);
  
    Logger.log('Response code: ' + response.getResponseCode());
    Logger.log('Response content: ' + response.getContentText());
  
    if (response.getResponseCode() !== 200 && response.getResponseCode() !== 204) {
      Logger.log('Discord API Error: ' + response.getContentText());
      throw new Error('Discord API request failed: ' + response.getContentText());
    }
  }
  
  function sendNotionLinksToDiscord() {
    var links = getNotionData();
  
    if (!Array.isArray(links)) {
      Logger.log('Error: links is not an array.');
      throw new Error('links is not an array');
    }
  
    var randomLinks = getRandomElements(links, 5);
    var formattedLinks = formatLinksAsMarkdown(randomLinks);
    var message = '本日の分からなかった応用情報技術者試験の問題:\n' + formattedLinks;
    sendToDiscordBot(message);
  }
  
  function testSendNotionLinksToDiscord() {
    sendNotionLinksToDiscord();
  }
  
