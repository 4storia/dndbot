module.exports = {
    commandAlias: 'clear initiative',
    commandParseRegex: new RegExp('^!dnd clear initiative$', 'ig'),
    action: async function (message) {
        const pinnedMessages = await message.channel.fetchPinnedMessages();
        pinnedMessages.forEach(message => {
            if (message.author.id === this.botId) {
                message.unpin();
            }
        });
    }
};
