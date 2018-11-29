module.exports = function (message) {
    if (!message.text || !(/^\/commands/ig.test(message.text.toLowerCase()) )) {
        return this;
    }

    const to = message.chat.id;
    const text = `
_*Commands*_

- */commands*: Show commands.

- */deploy* dev|prod : If _dev_ argument is selected, sets test server ahead in branch dev.
`;

    this.send_service.send(text,to,{parse_mode: 'Markdown'});
    return this;
}