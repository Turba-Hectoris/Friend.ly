module.exports = {
	checkUser: (req, res, next) => {
		if(req.session){
			let userID, username;
			({userID, username} = req.session)
			res.status(200).send({userID, username});
		}
		next();
	},
	createSession: (req, res, userID, username) => {
		return req.session.regenerate( () => {
			req.session.userID = userID;
			req.session.username = username;
			res.status(200).send({userID, username});
		});
	}
}

