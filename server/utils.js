module.exports = {
	checkUser: (req, res, next) => {
		({userId, username} = req.session)
		res.status(200).send({userid: userId, username: username});
		next();
	},
	createSession: (req, res, userID, username) => {
		return req.session.regenerate( () => {
			({userId, username} = req.session)
			res.send({userID: userID, username: username});
		});
	}
}

