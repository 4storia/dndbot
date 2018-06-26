module.exports = {
    alias: 'clear initiative',
    action: async function (message) {
        const pinnedMessages = await message.channel.fetchPinnedMessages();
        pinnedMessages.forEach(message => {
            if (message.author.id === this.botId) {
                message.unpin();
            }
        });
    }
};
