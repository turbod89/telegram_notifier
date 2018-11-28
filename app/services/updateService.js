const settings = require('../config/settings');
const { Observable, Subject, BehaviorSubject , ReplaySubject, from, of, range } = require('rxjs');
const { map, filter, switchMap } = require('rxjs/operators');

const BaseService = require('./baseService');

const UpdateServiceFactory = function UpdateServiceFactory() {

    const parse_url = relative_url => relative_url.replace(/^(.+[^\/])\/*$/,'$1');
    let instance = null;

    const UpdateService = function UpdateService() {

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

        const params = {
            offset: 0,
            timeout: 60,
            limit: 100,
        }


        const custom_data = {};
        
        const _updates = [];

        const _sourceUpdate = new Subject();
        const update$ = _sourceUpdate.asObservable();
        

        Object.defineProperties(this, {
            "$": {
                "enumerable": true,
                "configurable": false,
                "get": () => custom_data
            },

            "updates": {
                "enumerable": true,
                "configurable": false,
                "get": () => _updates
            },

            "update$": {
                "enumerable": true,
                "configurable": false,
                "get": () => update$
            },
            

            "call": {
                "enumerable": false,
                "configurable": false,
                "writable": false,
                "value": function call () {
            
                    baseService.get('/getUpdates',params).then( response => {
                        if (!response.ok || !response.result || !Array.isArray(response.result)) {
                            console.error('UpdateService: Unexpected response.');
                            return false;
                        } else {

                            response.result.forEach(update => {

                                _updates.push(update);
                                _sourceUpdate.next(update);

                                params.offset = Math.max(update.update_id + 1, params.offset);
                                
                            });

                            return this.call();
                        }
                    });
                }
            }
        });

        /**
         * Constructor
         */

        this.call();
        
        

        return instance;

    }

    return UpdateService;
}

module.exports = UpdateServiceFactory();