// Promises
// http://javascriptplayground.com/blog/2015/02/promises/?utm_source=javascriptweekly&utm_medium=email

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

var prepareDataForCsv = function(data) {
    return new Promise(function(resolve, reject) {
        // imagine this did something with the data
        // nothing async here but alows us to handel errors in the promise chain
        resolve(data);
    });
};

var writeToCsv = function(data) {
    return new Promise(function(resolve, reject) {
        // write to CSV
        resolve();
    });
};

fetchData().then(function(data) {
    return prepareDataForCsv(data);
}).then(function(data) {
    return writeToCsv(data);
}).then(function() {
    console.log('your csv has been saved');
});

fetchData().then(prepareDataForCsv).then(writeToCsv).then(function() {
  console.log('your csv has been saved');
});