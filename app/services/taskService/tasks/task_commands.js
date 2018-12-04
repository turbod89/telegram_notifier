module.exports = function (message) {
    if (!message.text || !(/^\/commands/ig.test(message.text.toLowerCase()) )) {
        return this;
    }

    const to = message.chat.id;
    const text = `
_*Commands*_

- */commands*: Show commands.

- */deployprod*: Sets prod server ahead in branch master.

- */deploytest1*: Sets test1 server ahead in branch dev.

- */deploytest2*: Sets test2 server ahead in branch dev.

- */deploytest3*: Sets test3 server ahead in branch dev.
`;

    this.send_service.send(text,to,{parse_mode: 'Markdown'});
    return this;
};