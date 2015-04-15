'use strict';

var WebWorker = require('worker!./webworker');

var dispatcher = require('../../dispatcher/ReactWebpackRound2AppDispatcher');

/**
 *
 */
class WebworkerService {

    /**
     *
     */
    constructor(){
        console.log('WebworkerService:constructor');
        this.worker = new WebWorker();
        this.worker.onmessage = this.workerOnMessage.bind(this);


        dispatcher.register(this.handleRenderRequest.bind(this));
    }


    getMessageRouteName(message) {
        return message.data[0];
    }

    getMessageRouteRender(message) {
        return message.data[1];
    }

    getPromiseName(routeName){
        return 'promise_' + routeName;
    }

    getResolveName(routeName){
        return 'resolve_' + routeName;
    }

    /**
     *
     */
    handleRenderResponse(routeName, routeRender){
        //console.log('WebworkerService:handleRenderResponse()', routeName, routeRender);
        setTimeout(() => {
            dispatcher.dispatch({
                namespace: routeName,
                event: 'renderresponse',
                render: routeRender
            });
        });

    }

    /**
     *
     * @param payload
     */
    handleRenderRequest(payload){

        //console.log('WebworkerService:handleRenderRequest', payload);

        if(payload.event === 'renderrequest'){
            this.renderRoute(payload.namespace, payload.path).then((routeRender) => {
                this.handleRenderResponse(payload.namespace, routeRender);
            });
        }
    }

    /**
    *
    * @param message
    */
    workerOnMessage(message){

        //console.log('WebworkerService:workerOnMessage', message);

        var routeName = this.getMessageRouteName(message);
        var routeRender = this.getMessageRouteRender(message);

        var resolveName = this.getResolveName(routeName);


        if(this[resolveName]){
            console.log(resolveName);

            this[resolveName](routeRender);
            setTimeout(() => {
                this[resolveName] = undefined;
            });

        }
        else{
            console.log('lost worker message', message);
        }

    }

    /**
    *
    * @param routeName
    * @returns {*}
    */
    renderRoute(routeName, path){

        var promiseName = this.getPromiseName(routeName);
        var resolveName = this.getResolveName(routeName);

        console.log('WebworkerService:renderRoute');

        if( ! this[promiseName]){
            this[promiseName] = new Promise((resolve, reject) => {
                this[resolveName] = resolve;
                this.worker.postMessage([routeName, path]);
            });
        }
        return this[promiseName];
    }

}




module.exports = new WebworkerService();

