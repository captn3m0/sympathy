define('sourcekit/notification', function() {

var Notification = {
	notify: function(image, title, content) {
		var notification = webkitNotifications.createNotification(image, title, content);
		notification.show();
		window.setTimeout((function() { this.cancel() }).bind(notification), 2000);
	}
}

return Notification;

});