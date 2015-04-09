'use strict';

var cookie = require('react-cookie');

/**
 *
 */
class AuthService {

    constructor(){

        //look for session in cookie / localstorage
        //if cookie -> attempt auth api to check

        this.token = undefined;
        this.quickaccessUser = undefined;
    }


    isLoggedInAsync() {
        return new Promise((resolve, reject) => {
            resolve(this.token);
        });
    }

    isLoggedIn(){
        return this.token;
    }


    setQuickaccessUser(user) {
        return new Promise((resolve, reject) => {
            this.quickaccessUser = user;
            resolve();
        });
    }

    getQuickaccessUser(){
        return this.quickaccessUser;
    }

    getPreviousUsers(){
        var previousLogins = cookie.load('previouslogin');

        if(previousLogins){
            previousLogins = previousLogins.split(',');
        }

        return previousLogins || [];
    }

    addPreviousUser(email){

        var previousLogin = cookie.load('previouslogin') || '';
        if(previousLogin.split(',').indexOf(email) === -1){
            if(previousLogin.length){
                previousLogin = previousLogin.concat(',');
            }
            previousLogin = previousLogin.concat(email);
            cookie.save('previouslogin', previousLogin);
        }
    }

    loginPin(user, pin){
        return new Promise((resolve, reject) => {

            //TODO dummy authentication
            setTimeout(() => {
                if((user === 'admin@admin.com' && pin === '1111') ||
                    (user === 'test@test.com' && pin === '1111')){


                    setTimeout(resolve);
                    this.token = true;

                    this.addPreviousUser(user);

                }
                else {
                    setTimeout(reject);
                    this.token = false;
                }
            }, 1000);

        });
    }

    loginPass(user, pass){

    }

}




module.exports = new AuthService();

