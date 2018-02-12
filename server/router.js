const router = require('express').Router();
const db = require('../db/index.js');
const controller = require('../db/controllers.js');
const util = require('./utils.js');
const bcrypt = require('bcrypt');
const cloudinarySDK = require('../services/cloudinary.js')
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
			res.status(200).send({response: 'Already a member', userID, username});
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
			res.status(200).send(results);
		})
		.catch(err => console.log(err))
	})
})

router.get('/dashboard/events/members', (req, res) => {
  const eventID = req.query.eventID;
  db.UserEvents.findAll({where: {eventID : eventID}}).then((events) => {
    let memberData = [];

    memberData = events.map(({userID}) => {
      return db.Users.findOne({where: {userID: userID}})
    })

    Promise.all(memberData)
    .then((results) => {
      res.status(200).send(results)
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
			db.Friendships.findAll({where: { userID }}).then((initFriendships) => {
					db.Friendships.findAll({where: { friendID: userID }}).then((uninitFriendships) => {
					const friendRequest = initFriendships.reduce((arrayOfRequest, { friendID: friendedMeBackID}) => {
						let friendObj = { friendID: friendedMeBackID, access: false};
						return arrayOfRequest.concat([db.Friendships.findOne({where: { userID: friendedMeBackID, friendID: userID }}), friendObj])
					}, [])
					const recievedFriendRequest = uninitFriendships.reduce((arrayOfRequest, { userID: friendedMeBackID, friendID }) => {
						let friendObj = { friendID: friendedMeBackID, access: true};
						return arrayOfRequest.concat([db.Friendships.findOne({where: { userID: friendID, friendID: friendedMeBackID }}), friendObj])
					}, [])
					Promise.all([...recievedFriendRequest, ...friendRequest])
					.then((friendRequestResults) => {
							const pendingFriendRequest = [];
							const pendingFriendRequestData = [];
							const friends = {};
							friendRequestResults.forEach((isFriend, idx, results) => {
								if(idx % 2 === 0) {
									if(isFriend === null) {
										pendingFriendRequest.push([isFriend, results[ ++idx]])
										pendingFriendRequestData.push(db.Users.findOne({where: { userID: results[idx].friendID}}))
									} else {
										friends[`${results[ ++idx ]}`] = [isFriend, results[idx]]
									}
								}
							})
						friendsData = Object.values(friends).map((friendshipObj) => {
							let friendID = friendshipObj[1].friendID
							return db.Users.findOne({where: { userID: friendID }})
						})
				Promise.all(friendsData)
				.then((results) => {
					Promise.all(pendingFriendRequestData)
					.then((pendingFriendRequestResolved) => {
					const friend_array = results.reduce((friend_arr, friend) => {
						let pull_data = 'username email gender bio userID profilePic'
						let friend_object = {};
						for(let attr in friend.dataValues) {
							if(pull_data.includes(attr)) {
								friend_object[attr] = friend.dataValues[attr]
							}
						}

						return friend_arr.concat([friend_object]);
					}, [])

					userClientSideData.friends = friend_array;
					userClientSideData.allPendingFriendRequest = pendingFriendRequest.map((FR_WithData, idx) => {
						({profilePic, username, facebookLoginPage, gender} = pendingFriendRequestResolved[idx])
						return FR_WithData.concat({profilePic, username, facebookLoginPage, gender})
					})	

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
							.catch(err => console.log(err))
						})
						.catch(err => console.log(err))
						})
						.catch(err => console.log(err))
					})
					.catch(err => console.log(err))
				})
				.catch(err => console.log(err))
			})
			.catch(err => console.log(err))
		})
		.catch(err => console.log(err))
	})
	.catch(err => console.log(err))
})

router.post('/profile_img_update', createfFileOnReq, ({ file: { path: imageFile }, query: { userID } } , res) => {
	
	cloudinarySDK
	.v2
	.uploader
	.upload(`${imageFile}`, 
	{
		public_id: `${userID}`,
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
		.catch(err => console.log(err))
		.then(updatedUser => {
			
			res.status(200).send({'response_message': `updated userID:${updatedUser.dataValues.userID} info`});
		})
		.catch(err => console.log(err))
  })
})

router.post('/profile_form_update', (req, res) => {
	let queryData = req.query;
	let userID = req.body.userID;

	queryData = Object.values(queryData)
	.reduce((filter, query, idx) => {
		if(query) { filter[Object.keys(queryData)[idx]] = query }
		return filter;
	}, {})
	
	db.Users.find({
		where: { userID: userID }
	})
	.then(user => {
		return user.update(queryData)
	})
	.then(updatedUser => {
		res.status(200).send({'response_message': `updated userID:${updatedUser.dataValues.userID} info`});
	})
	.catch(err => console.log(err))
});

router.post('/friendship_update', (req, res) => {
	let friendID = req.body.friendID;
	let userID = req.body.userID;

	console.log(typeof req.body.add)

	if(Number(req.body.add)) {
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
	} else {
		db.Friendships.findOne({where: {userID, friendID}}).then(({ id: id1}) => {
			db.Friendships.findOne({where: {userID: friendID, friendID: userID}}).then(({ id: id2 }) => {
				const unfriend = [id1, id2].map(id => db.Friendships.destroy({where: {id}}))
				Promise.all(unfriend)
				.then(results => res.status(200).send(results))
			})
			.catch(err => res.status(200).send({"response": "No friendship found"}))
		})
		.catch(err => res.status(200).send({"response": "No friendship found"}))
	}
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
			res.status(200).send({response: `Already attending eventID ${foundEvent.dataValues.eventID}`});
		}
	})
})

router.post('/createEvent', (req, res) => {
	let eventName = req.body.eventName;
	let capacity = req.body.capacity;
	let creatorID = req.body.creatorID;
	let category = req.body.category;
	let eventDesc = req.body.eventDesc;
	let startDate = req.body.startDate;
	let endDate = req.body.endDate;
	let imgLink = "http://winthehumanrace.ca/wp-content/uploads/2014/04/Pink-event.jpg";
	let locationName = req.body.location
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
	console.log('term : ', term, ' searchBy ', searchBy)
	
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
		const startDate = req.query.startDate;
    const endDate = req.query.endDate;
		console.log('in date search')
		console.log('startDate type from client', typeof startDate, ' endDate ', endDate);
		// db.Events.findAll({where: {[db.Op.or]: [{startDate: {
		// 	[db.Op.lte]: endDate
		// }}, {endDate: {
		// 	[db.Op.gte]: startDate
		// }}]}}).then((events) => {
		// 	console.log('getvent by date============', events);
	 //    res.send(events)
	 //  })
	 db.Events.findAll({where: {startDate : startDate}}).then(events => res.send(events))
	} else {
		console.log('in all search')
		db.Events.findAll({where: {status: 'active'}}).then(events => {
			console.log('sdate type in server: ', typeof events[0].startDate);
			res.send(events)
		})
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
