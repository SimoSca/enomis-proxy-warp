'use strict';

const debounce = (fn, delay) => {
    var timer = null;
    return () => {
        var context = this, args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
            fn.apply(context, args);
        }, delay);
    };
}

// $('input.username').keypress(debounce(function (event) {
//     // do the Ajax request
//   }, 250));


const throttle = (fn, threshhold, scope) => {
    threshhold || (threshhold = 250);
    var last,
        deferTimer;
    return () => {
        var context = scope || this;

        var now = +new Date,
            args = arguments;
        if (last && now < last + threshhold) {
            // hold on to it
            clearTimeout(deferTimer);
            deferTimer = setTimeout(function () {
                last = now;
                fn.apply(context, args);
            }, threshhold);
        } else {
            last = now;
            fn.apply(context, args);
        }
    };
}

// $('body').on('mousemove', throttle(function (event) {
//     console.log('tick');
//   }, 1000));



// Export all methods
module.exports = {
    throttle,
    debounce
};