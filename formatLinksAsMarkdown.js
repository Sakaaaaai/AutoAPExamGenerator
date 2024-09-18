function formatLinksAsMarkdown(links) {
    return links.map(function(url, index) {
      return `[問題 ${index + 1}](${url})`;
    }).join('\n');
  }