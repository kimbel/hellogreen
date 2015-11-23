
module.exports = function(app) {

	/* serves main page */
	app.get("/", function(req, res) {
    	res.sendfile('./client/index.html');
	});

	app.get("/style.css", function(req, res) {
    	res.sendfile('./client/style.css');
	});

	app.get("/img/hellogreen-logo-no-background.svg", function(req, res) {
    	res.sendfile('./client/img/hellogreen-logo-no-background.svg');
	});

	app.get("/favicon.ico", function(req, res) {
    	res.sendfile('./client/img/favicon.ico');
	});
};