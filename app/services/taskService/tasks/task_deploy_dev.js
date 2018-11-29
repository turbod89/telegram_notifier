const { exec } = require('child_process');
const { spawn } = require('child_process');

module.exports = function (message) {
    if ( !message.text || !(/^\/deploy +dev/ig.test(message.text.toLowerCase()) ) ) {
        return this;
    }
    const self = this;

    const command = spawn('sh',[
        './scripts/deploy_dev.sh',
        self.settings.paths.home,
        self.settings.paths.sailbs_repo,
        self.settings.paths.sailbs_doc,
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
}