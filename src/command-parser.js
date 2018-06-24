class CommandParser {
    constructor (options = {}) {
        this.botId = options.botId;
        this.ignoreOwnMessages = options.ignoreOwnMessages;
        this.namespace = options.namespace + ' ' || '';
        this.commands = {};
    }

    async parse (message) {
        if (message.author.id === this.botId && this.ignoreOwnMessages) return;

        const messageContent = message.content;
        for (const command of Object.values(this.commands)) {
            if (!command.commandParseRegex.test(messageContent)) {
                continue;
            }

            await command.action.call({ ...this, ...command }, message);
        }
    }

    registerCommands (commandArray) {
        commandArray.forEach(command => {
            this.registerCommand(command);
        });
    }

    registerCommand (command) {
        const { commandAlias } = command;

        if (!commandAlias) return console.error("RegisterCommand: You must provide an alias so this command can be called by a user");

        if (this.commands[commandAlias]) return console.error(`RegisterCommand: The command ${commandAlias} has already been registered`);

        this.commands[commandAlias] = command;
    }
}

module.exports = CommandParser;
