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