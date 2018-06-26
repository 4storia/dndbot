const DiceExpression = require('dice-expression-evaluator');

module.exports = {
    alias: 'roll',
    inline: true,
    contentRegex: new RegExp(`([0-9]*d[0-9]+[ 0-9+-]*)`, 'ig'),
    action: async function (message) {
        this.commandParseRegex.lastIndex = 0;

        const rolls = [];
        let matches = this.commandParseRegex.exec(message.content);

        while (matches) {
            rolls.push(matches[1].trim());
            matches = this.commandParseRegex.exec(message.content);
        }

        rolls.forEach(async (roll) => {
            const diceInstance = new DiceExpression(roll);
            const rollResults = diceInstance.roll();
            const rollDetails = rollResults.diceSums.length > 1 ? ` (${rollResults.diceSums.join(', ')})` : '';
            const naturalTwenty = diceInstance.dice[0].sideCount === 20 && rollResults.diceRaw[0][0] === 20;
            const critFail = diceInstance.dice[0].sideCount > 1 && rollResults.diceRaw[0][0] === 1;

            let rollMessage = `${message.author} rolled **${rollResults.roll}**${rollDetails}`;

            if (naturalTwenty) {
                const detailMessage = rollResults.roll > 20 ? `, FOR A TOTAL OF ${rollResults.roll} ${rollDetails}` : '';
                rollMessage = `🎉🎉🎉🎉🎉🎉 ${message.author} **ROLLED A NATURAL 20${detailMessage}** 🎉🎉🎉🎉🎉🎉 `;
            } else if (critFail) {
                rollMessage = `....${message.author} rolled a critical failure of **${rollResults.roll}**${rollDetails}`;
            }

            const messageObj = await message.channel.send(rollMessage);

            if (naturalTwenty) {
                messageObj.react('🎉');
                messageObj.react('👌');
            }

            if (critFail) {
                messageObj.react('🗑️');
                messageObj.react('👺');
            }
        });
    }
};
