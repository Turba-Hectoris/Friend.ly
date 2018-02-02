module.exports = {
	checkUser: (req, res, next) => {
		if(!req.session.userID) {
			console.log('not logged in')
			res.status(200).send('truthy');
		} else {
			// console.log(req.session.userID)
			next();
		}
	},
	createSession: (req, res, userID, username) => {
		return req.session.regenerate( () => {
			req.session.userID = userID;
			res.send({userID: userID, username: username})
		});
	},
	customStatic: (req, res) => {
		express.static(__dirname + '/../client/dist')
		next()
	}
}

