module.exports = {
    commandAlias: 'set initiative',
    commandParseRegex: new RegExp('!dnd set initiative (.+)', 'ig'),
    inlineCommand: false,
    action: async function (message) {
        this.commandParseRegex.lastIndex = 0;

        const regexResults = this.commandParseRegex.exec(message.content);

        if (!regexResults) return message.channel.send(`You must provide a comma-separated list of characters/enemies`);

        const pinnedMessages = await message.channel.fetchPinnedMessages();
        pinnedMessages.forEach(message => {
            if (message.author.id === this.botId) {
                message.unpin();
            }
        });

        const creatureList = regexResults[1].replace(/\s/gi, '').split(',');

        const formattedCreatureList = creatureList.map((creature, index) => {
            return `${index + 1}. ${creature}`;
        });

        const initiativeMessage = `__Current Initiative Order__\n` +
            `\n${formattedCreatureList.join('\n')}`;

        message.channel.send(initiativeMessage).then(messageObj => messageObj.pin());
    }
};
