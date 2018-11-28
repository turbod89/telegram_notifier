const settings = require('../config/settings');
const { Observable, Subject, BehaviorSubject , ReplaySubject, from, of, range } = require('rxjs');
const { map, filter, switchMap } = require('rxjs/operators');

const UpdateService = require('./updateService');
const Message = require('../classes/Message');

const MessageServiceFactory = function UpdateServiceFactory() {

    const parse_url = relative_url => relative_url.replace(/^(.+[^\/])\/*$/,'$1');
    let instance = null;

    const MessageService = function MessageService() {

        /**
         * Singleton
         */

        if (instance !== null) {
            return instance;
        }

        instance = this;

        const updateService = new UpdateService();

        const custom_data = {};
        
        const _messages = [];

        const _sourceMessage = new Subject();
        const message$ = _sourceMessage.asObservable();
        

        Object.defineProperties(this, {
            "$": {
                "enumerable": true,
                "configurable": false,
                "get": () => custom_data
            },

            "messages": {
                "enumerable": true,
                "configurable": false,
                "get": () => _messages
            },

            "message$": {
                "enumerable": true,
                "configurable": false,
                "get": () => message$
            },
            

        });

        /**
         * Constructor
         */

        const update_subscription = updateService.update$.subscribe(update => {
            if ('message' in update || 'channel_post' in update) {
                
                const message_data = 'message' in update ? update['message'] : update['channel_post'];

                const message = new Message(message_data);
                _messages.push(message);
                _sourceMessage.next(message);

            }
        });
        
        

        return instance;

    }

    return MessageService;
}

module.exports = MessageServiceFactory();