const router = require('express').Router();
// const db = require('../db/index.js');
// const controller = require('../db/controllers.js');
const cloudinarySDK = require('../services/cloudinary.js');
const util = require('./utils.js');
const bcrypt = require('bcrypt');

router.get('/checklogin', util.checkUser, (req, res) => {
	res.end()
})

router.post('/logout', util.expireSession, (req, res) => {
	res.end()
})

router.post('/signup', (req, res) => {
	var username = req.body.username;
	db.Users.findOne({where: {username: username}}).then( async (foundUser) => {
		if (!foundUser) {
			var password = await bcrypt.hash(req.body.password, 4)
			///Creating filler data and merging them with default with Object.assign
			let fillerdata = {
				bio: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium possimus blanditiis, facilis eligendi ea vero asperiores ipsa! Itaque exercitationem rerum veniam consequatur vitae earum error voluptatum ullam saepe. Fugit, ullam.",
				gender: 'M'
			}

			db.Users.findCreateFind({where: Object.assign({username: username, passHash: password, email: req.body.email}, fillerdata)})
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
	var username = req.body.username
	var password = req.body.password
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

router.get('/profile/data/:userID', (req, res) => {
	let userID = req.params.userID;
	db.Users.findOne({where: {userID: userID}}).then((user) => {
		let userClientSideData = {
			userID: user.dataValues.userID,
			username: user.dataValues.username,
			categories: user.dataValues.catagories,
			bio: user.dataValues.bio,
			email: user.dataValues.email,
			gender: user.dataValues.gender,
			createdAt: user.dataValues.createdAt,
			updatedAt: user.dataValues.updatedAt,
		};
			//FRIENDS ---Refactor to join tables
			db.Friendships.findAll({where: {userID: userID}}).then((friends) => {
				let friendsData = [];

				friendsData = friends.map(({ friendID }) => {
					return db.Users.findOne({where: {userID: friendID}})
				})

				Promise.all(friendsData)
				.then((results) => {
					//inserted friends HERE
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

						//EVENTS ---Refactor to join tables
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

router.post('/profile_update', (req, res) => {
	let userID = req.body.userID
	let queryData = req.query;
	let imagefile = req.files;

	console.log('content_of_imagefile:----', imagefile)

	queryData = Object.values(queryData).reduce((filter, query, idx) => {
		console.log(filter, query, idx)
		if(query) {
			filter[Object.keys(queryData)[idx]] = query
		}
		return filter;
	}, {})

	cloudinarySDK.v2.uploader.upload(`${image_file}`, {
		public_id: userID
	}, (err, { secureUrl }) => {
		if(err) console.log(err)
		
		console.log('content_of_cloudinary_response_payload:-----', secureUrl)
		

		db.Users.find({
			where: { userID }
		})
		.then(user => {
			return user.update(Object.assign(queryData, {imgUrl: secureUrl}))
		})
		.then(updatedUser => {
			res.status(200).send(userID + '');
		})
		.catch(err => console.log(err))
	})
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
			res.status(200).send({response: `Already friends ${foundFriendship}`});
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
			res.status(201).send({response: `Already attending ${foundEvent}`});
		}
	})
})

/////////////////////////////////////////////////////////////////
/////Route creates a event and associate it with a UserEvents////
/////                                                        ////
/////////////////////////////////////////////////////////////////

router.post('/createEvent', (req, res) => {
	console.log(req.body)
	let eventName = req.body.eventName;
	let capacity = req.body.capacity;
	let creatorID = req.body.creatorID;
	let category = req.body.category;
	let eventDesc = req.body.eventDesc;
	let startDate = req.body.startDate;
	let endDate = req.body.endDate;
	let imgLink = "http://winthehumanrace.ca/wp-content/uploads/2014/04/Pink-event.jpg"
	db.Events.findCreateFind({where: {imgLink: imgLink, startDate: startDate, endDate: endDate, eventName: eventName, capacity: capacity, eventDesc: eventDesc, category: category, creatorID: creatorID, }}).spread((event, created) => {
		db.UserEvents.findCreateFind({where: {userID: creatorID, eventID: event.dataValues.eventID}}).spread((userevent, created) => {
			res.send(userevent.dataValues)
		})
	})
})

////////////////////////
/// Used CREATE BULK ///
//See index.js db file//
//VvvvvvvvvvvvvvvvvvvV//
// router.post('/createUser', (req, res) => {
// 	let username = req.body.username;
// 	let bio = req.body.bio;
// 	let email = req.body.email;
// 	let gender = req.body.gender;
// 	let profileImg = "https://i.annihil.us/u/prod/marvel//universe3zx/images/f/f5/IronMan_Head.jpg"
// 	db.Events.findCreateFind({where: {profile: profileImg, username: username, bio: bio, email: email, gender: gender}}).spread((event, created) => {
// 		res.send(event.dataValues)
// 	})
// })

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////


router.get('/profile/events', (req, res) => {
  let userID = req.query.userID
  console.log(userID)
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
  const term = req.query.term
  db.Events.findAll({where: {eventName: {
    [db.Op.iLike]: '%' + term + '%'
  }}}).then((events) => {
    res.send(events)
  })
})

router.get('/userevents', (req, res) => {
    const eventID = req.query.eventID;
    const userID = req.query.userID;
    db.UserEvents.findOne({where: {eventID: eventID, userID: userID }}).then(event => {
      res.send(event);
    });
})

router.post('/userevents/add', (req, res) => {
	const userID = req.body.userID;
	const eventID = req.body.eventID;
	db.UserEvents.create({userID, eventID}).then((userEvent) => {
		res.send(userEvent);
	})
})

///////////////////////////////////////////////////////////////////

module.exports = router;
