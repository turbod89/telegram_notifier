module.exports = [
    require('./task_commands'),
    require('./task_deploy_dev'),

    function (update) {
        if (!!update.inline_query && !!update.inline_query.query) {
            console.log(update.inline_query.query)
        }
    }

];