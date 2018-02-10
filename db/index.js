const keys = require('../config.js');
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
const Op = Sequelize.Op;
const sequelize = new Sequelize('hectorfriendlydb', keys.pgresLogin, keys.pgresPW, {
	host: 'hrnyc12hector.csoqhkc1zx8z.us-east-2.rds.amazonaws.com',
	dialect: 'postgres',
  pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	}
})
const Users = sequelize.define('users', {
	userID: {
		type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true
	},
	username: {
		type: Sequelize.STRING
	},
	passHash: {
		type: Sequelize.STRING
	},
	categories: {
		type: Sequelize.STRING
	},
	bio: {
		type: Sequelize.STRING
	},
	email: {
		type: Sequelize.STRING
	},
	gender: {
		type: Sequelize.STRING
	},
	facebookID: {
		type: Sequelize.STRING
	},
	profilePic: {
		type: Sequelize.STRING
	}
})

const Friendships = sequelize.define('friendships', {
	userID: {
		type: Sequelize.INTEGER, 
	},
	friendID: {
		type: Sequelize.INTEGER
	}
})


const Events = sequelize.define('events', {
	eventID: {
		type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true
	},
	eventName: {
		type: Sequelize.STRING
	},
	status: {
		type: Sequelize.STRING, defaultValue: 'active'
	},
	creatorID: {
		type: Sequelize.INTEGER
	},
	startDate: {
		type: Sequelize.DATE(6)
	},
	endDate: {
		type: Sequelize.DATE(6)
	},
	capacity: {
		type: Sequelize.INTEGER
	},
	imgLink: {
		type: Sequelize.STRING
	},
	category: {
		type: Sequelize.STRING
	},
	eventDesc: {
		type: Sequelize.STRING
	},
	creatorName: {
		type: Sequelize.STRING
	}

})

const UserEvents = sequelize.define('userevents', {
	eventID: {
		type: Sequelize.INTEGER, 
	},
	userID: {
		type: Sequelize.INTEGER
	}
})


Users.sync({force: false})

Events.sync({force: false})

UserEvents.sync({force: false})

Friendships.sync({force: false})

Users.prototype.comparePassword = function (pwAttempt, callback) {
	bcrypt.compare(pwAttempt, this.passHash, (err, isMatch) => {
		callback(isMatch)
	})
}


// UserEvents.bulkCreate([
// 	{userID: 6, eventID: 1},
// 	{userID: 6, eventID: 2},
// 	{userID: 6, eventID: 3},
// 	{userID: 6, eventID: 6},
// 	{userID: 6, eventID: 7},
// ])

// Friendships.bulkCreate([
// 	{userID: 6, friendID: 1},
// 	{userID: 6, friendID: 3},
// 	{userID: 6, friendID: 5},
// 	{userID: 6, friendID: 2},
// 	{userID: 6, friendID: 4}
// ])


module.exports = {
	sequelize: sequelize,
	Users: Users,
	Events: Events,
	UserEvents: UserEvents,
	Op: Op,
	Friendships: Friendships
}
