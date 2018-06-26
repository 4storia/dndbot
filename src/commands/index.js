const Roll = require('./roll');
const Help = require('./help');
const HelpMe = require('./help-me');
const Initiative = require('./initiative');

module.exports = [ Roll, Help, HelpMe, ...Initiative ];
