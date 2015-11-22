
module.exports = function(app) {

	/* serves main page */
	app.get("/", function(req, res) {
    	res.sendfile('./client/index.html')
	});

};