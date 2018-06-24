const DiceExpression = require('dice-expression-evaluator');

module.exports = {
    commandAlias: 'roll',
    commandParseRegex: new RegExp('!dnd roll ([0-9]*d[0-9]+[ 0-9+-]*)', 'ig'),
    action: async function (message) {
        this.commandParseRegex.lastIndex = 0;

        const rolls = [];
        let matches = this.commandParseRegex.exec(message.content);

        while (matches) {
            rolls.push(matches[1].trim());
            matches = this.commandParseRegex.exec(message.content);
        }

        rolls.forEach((roll) => {
            const diceInstance = new DiceExpression(roll);
            const rollResults = diceInstance.roll();
            const rollDetails = rollResults.diceSums.length > 1 ? ` (${rollResults.diceSums.join(', ')})` : '';
            message.channel.send(`${message.author} rolled **${rollResults.roll}**${rollDetails}`);
        });
    }
};
