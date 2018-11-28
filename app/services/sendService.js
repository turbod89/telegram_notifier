const settings = require('../config/settings');
const { Observable, Subject, BehaviorSubject , ReplaySubject, from, of, range } = require('rxjs');
const { map, filter, switchMap } = require('rxjs/operators');

const BaseService = require('./baseService');

const Message = require('../classes/Message');

const SendServiceFactory = function SendServiceFactory() {

    const parse_url = relative_url => relative_url.replace(/^(.+[^\/])\/*$/,'$1');
    let instance = null;

    const SendService = function SendService() {

        /**
         * Singleton
         */

        if (instance !== null) {
            return instance;
        }

        instance = this;

        const token = settings['telegram-bot-token'];
        const url_base = parse_url(settings['telegram-base-url']) + '/bot' + token;

        const baseService = new BaseService(url_base);

        const custom_data = {};
        

        Object.defineProperties(this, {
            "$": {
                "enumerable": true,
                "configurable": false,
                "get": () => custom_data
            },
            

            "send": {
                "enumerable": false,
                "configurable": false,
                "writable": false,
                "value": function send (o) {
                    
                    if ( typeof o === 'string') {
                        return this.send_message.apply(this,arguments);
                    }

                }
            },

            "send_message": {
                "enumerable": false,
                "configurable": false,
                "writable": false,
                "value": function send_message (message_text, chat_id, options = {}) {
            
                    const data = {
                        'text': message_text,
                        'chat_id': chat_id,
                        ...options
                    }

                    return baseService.post('/sendMessage',{},{...baseService.headers.json}, data).then( response => {
                        if (!response.ok || !response.result ) {
                            console.error('SendService: Unexpected response.');
                            return false;
                        } else { }

                        return response.result;
                    });
                }
            },
        });

        /**
         * Constructor
         */
        
        

        return instance;

    }

    return SendService;
}

module.exports = SendServiceFactory();