module.exports = {
    alias: 'remove initiative',
    contentRegex: new RegExp('(.+)', 'i'),
    action: async function (message) {
        const pinnedMessages = await message.channel.fetchPinnedMessages();
        const initiativeOrder = pinnedMessages.find(message => message.author.id === this.botId && message.content.includes('Current Turn Order'));
        if (!initiativeOrder) return message.channel.send(`No turn order order found. You can do this via "!dnd set initiative"`);

        this.commandParseRegex.lastIndex = 0;
        const regexMatches = this.commandParseRegex.exec(message.content);

        if (!regexMatches) return message.channel.send(`You must specify a creature to remove from the turn order list`);

        const creatureToRemove = regexMatches[1];
        const parsedInitiativeOrder = initiativeOrder.content.split('\n');
        parsedInitiativeOrder.splice(0, 2);

        const creatureToRemoveRegex = new RegExp(`[0-9]+. ${creatureToRemove}`, 'i');
        const creatureToRemoveIndex = parsedInitiativeOrder.findIndex(lineItem => lineItem.match(creatureToRemoveRegex));

        if (!creatureToRemoveIndex) return message.channel.send(`"${creatureToRemove}" was not found in the turn order list`);

        parsedInitiativeOrder.splice(creatureToRemoveIndex, 1);

        const newInitiativeOrder = parsedInitiativeOrder.map((lineItem, index) => {
            return lineItem.replace(/[0-9]./i, `${index + 1}.`);
        });

        const initiativeMessage = `__Current Turn Order__\n` +
            `\n${newInitiativeOrder.join('\n')}`;

        initiativeOrder.edit(initiativeMessage);
        message.channel.send(`${creatureToRemove} has been removed from the turn order list`);
    }
};
