module.exports = {
	checkUser: (req, res, next) => {
		if(!req.session.userID) {
			console.log('not logged in')
			res.redirect('/login');
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
	}
}

