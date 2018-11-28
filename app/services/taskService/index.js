const settings = require('../../config/settings.json');

const MessageService = require('../messageService');
const SendService = require('../sendService');
const UpdateService = require('../updateService');

const tasks = require('./tasks');

const TaskServiceFactory = function TaskServiceFactory() {

    let instance = null;

    const TaskService = function TaskService() {

        /**
         * Singleton
         */

        if (instance !== null) {
            return instance;
        }

        instance = this;

        const custom_data = {};

        Object.defineProperties(this, {
            "$": {
                "enumerable": true,
                "configurable": false,
                "get": () => custom_data,
            },
            "settings": {
                "enumerable": true,
                "configurable": false,
                "get": () => settings,
            },
            "send_service": {
                "enumerable": true,
                "configurable": false,
                "writable": false,
                "value": new SendService(),
            },
            "message_service": {
                "enumerable": true,
                "configurable": false,
                "writable": false,
                "value": new MessageService(),
            },
            "update_service": {
                "enumerable": true,
                "configurable": false,
                "writable": false,
                "value": new UpdateService(),
            },
            
        });

        /**
         * Constructor
         */
        
        const message_subscription = this.message_service.message$.subscribe( message => {
            tasks.forEach(task => task.call(instance,message));
        });

        const update_subscription = this.update_service.update$.subscribe( update => {
            tasks.forEach(task => task.call(instance,update));
        });

        return instance;

    }

    return TaskService;
}

module.exports = TaskServiceFactory();