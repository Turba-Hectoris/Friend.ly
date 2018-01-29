module.exports = {
	checkUser: (req, res, next) => {
		if(!req.session.id) {
			res.redirect('/login');
		} else {
			next();
		}
	},
	createSession: (req, res, newUser) => {
		return req.session.regenerate( () => {
			req.session.id = id;
			res.redirect('/main');
		});
	}
}