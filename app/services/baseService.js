const fetch = require('node-fetch')

const BaseServiceFactory = function BaseServiceFactory() {

    const parse_relative_url = relative_url => relative_url.replace(/^\/*(.+)/,'$1');
    let instance = null;

    const BaseService = function BaseService( url_base ) {

        /**
         * Singleton
         */

        if (instance !== null) {
            return instance;
        }

        instance = this;

        url_base = parse_relative_url(url_base);

        const headers = {
            'json': {"Content-Type": "application/json; charset=utf-8"},
        };

        const custom_data = {};

        Object.defineProperties(this, {

            "url": {
                "enumerable": true,
                "configurable": false,
                "writable": false,
                "value": (relative_url = '') => url_base + '/' + parse_relative_url(relative_url),
            },
            "get": {
                "enumerable": true,
                "configurable": false,
                "writable": false,
                "value": function (...args) {
                    args.unshift('GET');
                    return this.call.apply(this,args);
                }
            },
            "post": {
                "enumerable": true,
                "configurable": false,
                "writable": false,
                "value": function (...args) {
                    args.unshift('POST');
                    return this.call.apply(this,args);
                }
            },
            "put": {
                "enumerable": true,
                "configurable": false,
                "writable": false,
                "value": function (...args) {
                    args.unshift('put');
                    return this.call.apply(this,args);
                }
            },
            "delete": {
                "enumerable": true,
                "configurable": false,
                "writable": false,
                "value": function (...args) {
                    args.unshift('DELETE');
                    return this.call.apply(this,args);
                }
            },
            "call": {
                "enumerable": true,
                "configurable": false,
                "writable": true,
                "value": function (method = 'GET', url_string = '', params = {} ,headers = {}, body = null) {
                    const init = {
                        method: method.toUpperCase(),
                        headers: { ...headers},
                    };

                    if (init.method === 'POST' || init.method === 'PUT' || init.method === 'DELETE') {
                        body_string = JSON.stringify(body);
                        init.body = body_string;
                        init.headers['Content-Length'] = body_string.length.toString();
                    } 

                    const url = new URL(this.url(url_string));
                    for (let param_name in params) {
                        const param_value = params[param_name];
                        url.searchParams.set(param_name,param_value);
                    }

                    return fetch(url, init)
                        .then (res => {
                            if (res.headers.has('Content-Type') && res.headers.get('Content-Type') === 'application/json') {
                                return res.json();
                            }
                            return res;
                        });
                }
            },

            "headers": {
                "enumerable": true,
                "configurable": false,
                "get": () => headers
            },
            "$": {
                "enumerable": true,
                "configurable": false,
                "get": () => custom_data
            },
        });

        /**
         * Constructor
         */
        
        

        return instance;

    }

    return BaseService;
}

module.exports = BaseServiceFactory();