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