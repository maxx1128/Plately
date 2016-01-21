var $ = require('jquery');

exports.multiply = function(n) {
    return n * 111
};

exports.total = 500;

exports.hideItem = function(object) {
	$(object).on('click', function(){
		$(this).hide();
	});
}