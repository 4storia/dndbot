module.exports = {
    alias: 'next initiative',
    action: async function (message) {
        const pinnedMessages = await message.channel.fetchPinnedMessages();

        const currentTurnMessage = pinnedMessages.find(message => message.author.id === this.botId && message.content.includes('Current turn:'));

        if (!currentTurnMessage) return message.channel.send(`It isn't anyone's turn - Are you sure you set the initiative order? You can do this via "!dnd set initiative"`);

        const currentCreature = currentTurnMessage.content.replace('Current turn: ', '');

        const initiativeOrder = pinnedMessages.find(message => message.author.id === this.botId && message.content.includes('Current Turn Order'));

        if (!initiativeOrder) return message.channel.send(`No initiative order found. You can do this via "!dnd set initiative"`);

        const parsedInitiativeOrder = initiativeOrder.content.split('\n');
        parsedInitiativeOrder.splice(0, 2);


        const currentCreatureRegex = new RegExp(`[0-9]+. ${currentCreature}`, 'i');
        const currentCreatureIndex = parsedInitiativeOrder.findIndex(lineItem => lineItem.match(currentCreatureRegex));
        let nextCreatureIndex = 0;
        if (currentCreatureIndex < parsedInitiativeOrder.length - 1) {
            nextCreatureIndex = currentCreatureIndex + 1;
        }

        const newCreature = parsedInitiativeOrder[nextCreatureIndex].replace(/[0-9]+. /, '');

        currentTurnMessage.edit(`Current Turn: ${newCreature}`);
        message.channel.send(`${newCreature} can now take their turn.`);
    }
};
