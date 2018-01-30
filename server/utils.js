module.exports = {
	checkUser: (req, res, next) => {
		if(!req.session.id) {
			res.redirect('/login');
		} else {
			next();
		}
	},
	createSession: (req, res, userID) => {
		return req.session.regenerate( () => {
			req.session.userID = userID;
			res.redirect('/main');
		});
	}
}

