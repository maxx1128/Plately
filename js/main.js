var $ = require('jquery'),
	foo = require('./test');

// Modernizr tests and the trigger to run them
require('browsernizr/test/css/flexbox');
require('browsernizr');



console.log(foo.multiply(5));
console.log(foo.total + ' is the total!');


// foo.hideItem('h1, h2, h3');