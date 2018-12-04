const { exec } = require('child_process');
const { spawn } = require('child_process');

module.exports = function (message) {

    const r = /^\/deploy(prod|test[123])/i;

    if ( !message.text || !(r.test(message.text) ) ) {
        return this;
    }
    const self = this;

    const repo_code = message.text.match(r)[1];

    if (!(repo_code in self.settings.paths.backend_repos)) {
        console.log(`Not found repo *${repo_code}*.`);
        self.send_service.send(`Not found repo *${repo_code}*.`,message.chat.id);
        return;
    }

    const command = spawn('sh',[
        './scripts/deploy.sh',
        self.settings.paths.home,
        self.settings.paths.backend_repos[repo_code].repo,
        self.settings.paths.backend_repos[repo_code].docs,
        self.settings.paths.backend_repos[repo_code].branch,
    ]);

    command.stdout.on('data', function (data) {
        console.log(data.toString());
        self.send_service.send(data.toString(),message.chat.id);
    });

    command.stderr.on('data', function (data) {
        console.log(data.toString());
        self.send_service.send(data.toString(),message.chat.id);
    });

    command.on('close', function (code) {
        console.log(`child process exited with code ${code}`);
    });
};