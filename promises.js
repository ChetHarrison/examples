// Promises
// http://javascriptplayground.com/blog/2015/02/promises/?utm_source=javascriptweekly&utm_medium=email
'use strict';

var Q = require('q'),
    Promise = Q.Promise;

var fetchData = function() {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            resolve({
                users: [{
                    name: 'Jack',
                    age: 22
                }, {
                    name: 'Tom',
                    age: 21
                }, {
                    name: 'Isaac',
                    age: 21
                }, {
                    name: 'Iain',
                    age: 20
                }]
            });
        }, 50);
    });
};

// changing functions that expect some data to instead take a promise
// that will resolve to some data
//
var prepareDataForCsv = function(dataPromise) {
    return dataPromise().then(function(data) {
        return data;
    });
};

var writeToCsv = function(data) {
    return new Promise(function(resolve, reject) {
        resolve();
    });
};

var confirmSuccess = function() {
    console.log('your csv has been saved');
};

var errorHandler = function(error) {
    console.log('something went wrong', error);
};


// now chain up the async into a sync path
prepareDataForCsv(fetchData).
then(writeToCsv).
then(confirmSuccess).
catch(errorHandler);


// Recursion in Promises

var count = 0;

var http = function() {
    if (count === 0) {
        count++;
        return Promise.resolve({
            more: true,
            user: {
                name: 'jack',
                age: 22
            }
        });
    } else {
        return Promise.resolve({
            more: false,
            user: {
                name: 'isaac',
                age: 21
            }
        });
    }
};

var fetchData = function() {
    var goFetch = function(users) {
        return http().then(function(data) {
            users.push(data.user);
            if (data.more) {
                return goFetch(users);
            } else {
                return users;
            }
        });
    };

    return goFetch([]);
};
