var $ = require('jquery'),
	nav = require('./components/nav'),
	content = require('./components/content'),
	callout = require('./components/callout');

// Modernizr tests and the trigger to run them
require('browsernizr/test/css/flexbox');
require('browsernizr');

nav.basic();
nav.side();

content.dropdown();

callout.modal("#modal-1");