const helpMessage = `\`\`\`\n
Hi, I'm @dnd-bot!

I'm here to help you with the basics of Dungeons and Dragons campaign management.

All of my commands can be triggered by using the prefix \`!dnd\`, or by @ mentioning me.
For example:

!dnd roll d20
is the same as
@dnd-bot roll d20

I support the following commands:

roll:
    Examples:
        !dnd roll d20
        !dnd roll d20+5
        !dnd roll 2d8+3
    Useage:
        This command can be used inline. For instance:
        "I'd like to make an arcana check, @dnd-bot roll d20+3"

set initiative <comma separated list>:
    Examples:
        !dnd set initiative Half-Orc Rogue 1, @discordUser#837, Half-Orc Rogue 2
    Usage:
        This command must be its own message.
        This command will create a pinned message with the initiative order,
        as well as a pinned message with who's turn it is.

remove intiative <creature>:
    Examples:
        !dnd remove initiative Half-Orc Rogue 1
        @dnd-bot remove initiative @discordUser#837
    Usage:
        This command must be its own message.

next turn:
    Examples:
        !dnd next turn
    Usage:
        This command must be its own message.
        This command will update the pinned "current turn" message with the new
        creature, or @ mention a player if it is their turn.

clear initiative:
    Examples:
        !dnd clear initiative
    Usage:
        This command must be its own message.
        This command will remove both pinned messages around an instance of
        combat, bringing it to a close.
\`\`\``;

module.exports = {
    alias: 'help',
    action: async function (message) {
        message.channel.send(helpMessage);
    }
};
