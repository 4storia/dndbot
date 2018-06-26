class CommandParser {
    constructor (options = {}) {
        this.botId = options.botId;
        this.ignoreOwnMessages = options.ignoreOwnMessages;
        this.namespace = options.namespace || '';
        this.commands = {};
    }

    async parse (message) {
        if (message.author.id === this.botId && this.ignoreOwnMessages) return;

        const messageContent = message.content;
        for (const command of Object.values(this.commands)) {
            if (!command.commandParseRegex.test(messageContent)) {
                continue;
            }
            
            try {
                await command.action.call({ ...this, ...command }, message);
            } catch (err) {
                console.error(`Error running command ${command.alias}:`, err);
            }
        }
    }

    registerCommands (commandArray) {
        commandArray.forEach(command => {
            this.registerCommand(command);
        });
    }

    registerCommand (command) {
        const { alias, contentRegex } = command;

        if (!alias) return console.error("RegisterCommand: You must provide an alias so this command can be called by a user");

        if (this.commands[alias]) return console.error(`RegisterCommand: The command ${alias} has already been registered`);

        let commandParseRegex = new RegExp(`(?:!${this.namespace}|<@${this.botId}>) ${alias}`, 'ig');

        if (command.inline) {
            if (contentRegex) {
                commandParseRegex = new RegExp(commandParseRegex.source + ' ' + contentRegex.source, 'ig');
            }
        } else {
            if (contentRegex) {
                commandParseRegex = new RegExp(commandParseRegex.source + ' ' + contentRegex.source, 'i');
            }

            commandParseRegex = new RegExp('^' + commandParseRegex.source + '$', 'i');
        }

        command.commandParseRegex = commandParseRegex;

        this.commands[alias] = command;
    }
}

module.exports = CommandParser;
