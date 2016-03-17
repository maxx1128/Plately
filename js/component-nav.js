var $ = require('jquery');

exports.basic = function() {

	var menuToggle = $('#js-mobile-menu').unbind();
	$('#js-navigation-menu').removeClass("show");

	menuToggle.on('click', function(e) {
		e.preventDefault();
		$('#js-navigation-menu').slideToggle(function(){
			if($('#js-navigation-menu').is(':hidden')) {
				$('#js-navigation-menu').removeAttr('style');
			}
		});
	});
}



exports.side = function() {

	$(document).ready(function(){
	  $('.sliding-panel-button,.sliding-panel-fade-screen,.sliding-panel-close').on('click touchstart',function (e) {
	    $('.sliding-panel-content,.sliding-panel-fade-screen').toggleClass('is-visible');
	    e.preventDefault();
	  });
	});

}