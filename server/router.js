const router = require('express').Router();
const db = require('../db/index.js');
const controller = require('../db/controllers.js');
const util = require('./utils.js');
const bcrypt = require('bcrypt');
const multer  = require('multer')
const upload = multer({'dest': 'upload/'});
const createfFileOnReq = upload.single('file');



router.get('/checklogin', util.checkUser, (req, res) => {
	res.end()
})

router.post('/logout', util.expireSession, (req, res) => {
	res.end()
})

router.post('/facebookLogin', (req, res) => {
	let fbID = req.body.id;
	let email = req.body.email;
	let username = req.body.username;
	let picture = req.body.picture
	let fbLink = req.body.link;
	let gender = req.body.gender;

	db.Users.findOne({where: {facebookID: fbID}}).then( (user) => {
		if (!user) {
			db.Users.findCreateFind({where: {
				facebookID: fbID, 
				username: username, 
				email: email, 
				profilePic: picture,
				facebookLoginPage: fbLink,
				gender: gender,
			}})
			.spread((user, created) => {
				let userID = user.dataValues.userID
				util.createSession(req, res, userID)
			})
		} else {
			let userID = user.dataValues.userID
			util.createSession(req, res, userID)
		}
	})
})

router.post('/signup', (req, res) => {
	let username = req.body.username;
	db.Users.findOne({where: {username: username}}).then( async (foundUser) => {
		if (!foundUser) {
			let password = await bcrypt.hash(req.body.password, 4)

			db.Users.findCreateFind({where: {username: username, passHash: password, email: req.body.email}})
			.spread((user, created) => {
				({userID, username} = user.dataValues)
				res.status(200).send({userID, username});
			})
		} else {
			({userID, username} = foundUser.dataValues)
			res.status(200).send({response: 'Already a memeber', userID, username});
		}
	})
})

router.post('/login', (req, res) => {
	let username = req.body.username
	let password = req.body.password
	db.Users.findOne({where: {username: username}})
	.then((user) => {
		if (!user) {
			res.status(200).send({response: 'member not found'});
		} else {
			user.comparePassword(req.body.password, (isMatch) => {
				if (!isMatch) {
					res.status(200).send({response: 'invalid password'})
				} else {
					let userID = user.dataValues.userID
					util.createSession(req, res, userID)
				}
			})
		}
	})
})

router.get('/dashboard/events', (req, res) => {
	const userID = req.query.userID;
		//EVENTS ---Refactor to join tables
	db.UserEvents.findAll({where: {userID: userID}}).then((events) => {
		let eventsData = [];

		eventsData = events.map(({ eventID }) => {
			return db.Events.findOne({where: {eventID: eventID}})
		})

		Promise.all(eventsData)
		.then((results) => {
			// console.log('events: ', results)
			res.status(200).send(results);
		})
	})
})

router.get('/profile/data/:userID', (req, res) => {
	let userID = req.params.userID;
	db.Users.findOne({where: {userID: userID}}).then((user) => {

		let userClientSideData = {
			userID: user.dataValues.userID,
			username: user.dataValues.username,
			bio: user.dataValues.bio,
			email: user.dataValues.email,
			gender: user.dataValues.gender,
			createdAt: user.dataValues.createdAt,
			updatedAt: user.dataValues.updatedAt,
			profilePic: user.dataValues.profilePic
		};
			db.Friendships.findAll({where: {userID: userID}}).then((friends) => {
				let friendsData = [];

				friendsData = friends.map(({ friendID }) => {
					return db.Users.findOne({where: {userID: friendID}})
				})

				Promise.all(friendsData)
				.then((results) => {
					const friend_array = results.reduce((friend_arr, friend) => {
						let pull_data = 'username email gender bio userID'
						let friend_object = {};

						for(let attr in friend.dataValues) {
							if(pull_data.includes(attr)) {
								friend_object[attr] = friend.dataValues[attr]
							}
						}

						return friend_arr.concat([friend_object]);
					}, [])

					userClientSideData.friends = friend_array;

						db.UserEvents.findAll({where: {userID: userID}}).then((events) => {
							let eventsData = [];

							eventsData = events.map(({ eventID }) => {
								return db.Events.findOne({where: {eventID: eventID}})
							})

							Promise.all(eventsData)
							.then((results) => {
								userClientSideData.events = results;
								res.status(200).send(userClientSideData);
							})
						})
				})
			})
	})
})

router.post('/profile_img_update', createfFileOnReq, ({ body }, res) => {
	let imageFile = req.file.path;


	cloudinarySDK
	.v2
	.uploader
	.upload(`${imageFile}`, 
	{
		public_id: `${body.userID}`,
	}, (err, { secure_url }) => {
		if(err) console.log(err)
		db.Users.find({
			where: { userID }
		})
		.then(user => {
			return user.update({
				profilePic: secure_url 
			})
		})
		.then(updatedUser => {
			res.status(201).send(updatedUser.userID);
		})
		.catch(err => console.log(err))
  })
})

router.post('/profile_form_update', (req, res) => {
	let queryData = req.query;

	queryData = Object.values(queryData)
	.reduce((filter, query, idx) => {
		if(query) { filter[Object.keys(queryData)[idx]] = query }
		return filter;
	}, {})
	
	db.Users.find({
		where: { userID: userID }
	})
	.then(user => {
		return user.update(...Object.values(data))
	})
	.then(updatedUser => {
		res.status(201).send(updatedUser.userID);
	})
	.catch(err => console.log(err))
});

router.post('/friendship_update', (req, res) => {
	let friendID = req.body.friendID;
	let userID = req.body.userID;

	db.Friendships.findOne({where: {userID, friendID}}).then((foundFriendship) => {
		if (!foundFriendship) {
			db.Friendships.findCreateFind({where: {userID, friendID}})
			.then((friendship) => {
				res.status(200).send({response: friendship});
			})
		} else {
			res.status(301).send({response: `Already friends ${foundFriendship}`});
		}
	})
})

router.post('/event_attendance_update', (req, res) => {
	let eventID = req.body.eventID;
	let userID = req.body.userID;

	db.UserEvents.findOne({where: {userID, eventID}}).then((foundEvent) => {
		if (!foundEvent) {
			db.UserEvents.findCreateFind({where: {userID, eventID}})
			.then((event) => {
				res.status(200).send({response: event});
			})
		} else {
			res.status(301).send({response: `Already attending ${foundEvent}`});
		}
	})
})

/////////////////////////////////////////////////////////////////
/////Route creates a event and associate it with a UserEvents////
/////                                                        ////
/////////////////////////////////////////////////////////////////

router.post('/createEvent', (req, res) => {
	let eventName = req.body.eventName;
	let capacity = req.body.capacity;
	let creatorID = req.body.creatorID;
	let category = req.body.category;
	let eventDesc = req.body.eventDesc;
	let startDate = req.body.startDate;
	let endDate = req.body.endDate;
	let imgLink = "http://winthehumanrace.ca/wp-content/uploads/2014/04/Pink-event.jpg";
	db.Users.findOne({where: {userID: creatorID}}).then(user => {
		const creatorName = user.username;
		db.Events.findCreateFind({where: {imgLink: imgLink, startDate: startDate, endDate: endDate, eventName: eventName, capacity: capacity, eventDesc: eventDesc, category: category, creatorID: creatorID, creatorName: creatorName}}).spread((event, created) => {
			db.UserEvents.findCreateFind({where: {userID: creatorID, eventID: event.dataValues.eventID}}).spread((userevent, created) => {
				res.send(userevent.dataValues)
			})
		})
	})
})

router.get('/profile/events', (req, res) => {
  let userID = req.query.userID
  // console.log(userID)
	db.UserEvents.findAll({where: { userID: userID }})
	.then((events) => {
		const allUserEvents = events.map((event) => {
			return db.Events.findOne({where: {eventID: event.eventID}})
		})
		
		Promise.all(allUserEvents)
		.then((results) => {
			res.status(200).send(results)
		})
		.catch(err => res.status(500).send(err))
	})
	.catch(err => res.status(500).send(err))
})

/////////////// SEARCH COMPONENT REQUEST /////////////////////////

router.get('/search/events', (req, res) => {
  const term = req.query.term;
  const searchBy = req.query.searchBy;
	// console.log('term : ', term, ' searchBy ', searchBy)

	if(searchBy === 'name') {
		db.Events.findAll({where: {eventName: {
	    [db.Op.iLike]: '%' + term + '%'
	  }}}).then((events) => {
	    res.send(events)
	  })
	} else if (searchBy === 'category') {
		db.Events.findAll({where: {category: term}}).then((events) => {
	    res.send(events)
	  })
	} else if (searchBy === 'date'){
		// consoel.log('in date search')
		db.Events.findAll({where: {[db.Op.or]: [{startDate: term}, {endDate: term}]}}).then((events) => {
	    res.send(events)
	  })
	} else {
		// console.log('in all search')
		db.Events.findAll().then(events => res.send(events))
	}
})

router.get('/search/userevents', (req, res) => {
    const eventID = req.query.eventID;
    const userID = req.query.userID;
    db.UserEvents.findOne({where: {eventID: eventID, userID: userID }}).then(event => {
      res.send(event);
    });
})

router.post('/search/userevents/add', (req, res) => {
	const userID = req.body.userID;
	const eventID = req.body.eventID;
	db.UserEvents.create({userID, eventID}).then((userEvent) => {
		res.send(userEvent);
	})
})

///////////////////////////////////////////////////////////////////

module.exports = router;
