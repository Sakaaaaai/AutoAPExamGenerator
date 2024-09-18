# Notion to Discord Bot

Google Apps Script (GAS) project to fetch problem links from Notion database and send them to Discord bot.

## Overview

This script provides the following functionalities:

- Fetches links of problems from a specified Notion database that are marked as "未着手" (not started).
- Randomly selects 5 problems from the fetched links and formats them in Markdown.
- Sends the formatted problem links to a specified Discord channel via a Webhook URL.

## Usage

### Setup

1. **Notion API Setup**
   - Set `Notion_api` and `Notion_databaseId` in the project properties of Google Apps Script for access to Notion.

2. **Discord Webhook Setup**
   - Set `Discord_webhookUrl` in the project properties for sending messages to Discord.

### Running the Script

- Execute `sendNotionLinksToDiscord()` to send randomly selected problem links from Notion to the specified Discord channel.

## Function Details

### `getNotionData()`

Fetches links of problems from Notion database that are marked as "未着手".

### `getRandomElements(arr, num)`

Selects random elements from the specified array.

### `formatLinksAsMarkdown(links)`

Formats the array of links into Markdown format.

### `sendToDiscordBot(message)`

Sends the specified message to Discord via the Webhook URL.

### `sendNotionLinksToDiscord()`

Fetches problem links from Notion, selects 5 random links, formats them in Markdown, and sends them to Discord.

### `testSendNotionLinksToDiscord()`

Tests `sendNotionLinksToDiscord()` function.

## Error Handling and Considerations

- Each function throws an error if HTTP response codes indicate failure. Specifically, errors from Discord API requests are logged.
- It is recommended to use the latest version of Notion API (`Notion-Version`). Older versions may not support all features.

## Testing

- Use `testSendNotionLinksToDiscord()` function to verify the script functions as expected before actual use.

---

This README.md provides clear explanations and setup instructions, making it easier for other developers or team members to understand and configure the project.
