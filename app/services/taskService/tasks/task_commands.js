module.exports = function (message) {
    if (!message.text || message.text.toLowerCase() !== 'commands') {
        return this;
    }

    const to = message.chat.id;
    const text = `
_*Commands*_
1. commands
2. deploy dev
`;

    this.send_service.send(text,to,{parse_mode: 'Markdown'});
    return this;
}