var $ = require('jquery'),
	nav = require('./component-nav'),
	content = require('./component-content'),
	callout = require('./component-callout');

// Modernizr tests and the trigger to run them
require('browsernizr/test/css/flexbox');
require('browsernizr');

nav.basic();
nav.side();

content.dropdown();

callout.modal("#modal-1");