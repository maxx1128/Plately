var $ = require('jquery'),
	foo = require('./test'),
	nav = require('./component-nav');

// Modernizr tests and the trigger to run them
require('browsernizr/test/css/flexbox');
require('browsernizr');

nav.basic();
nav.side();

console.log(foo.multiply(5));
console.log(foo.total + ' is the total!');


// foo.hideItem('h1, h2, h3');