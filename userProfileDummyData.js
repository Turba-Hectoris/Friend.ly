module.exports = [{
  userId: 1,
  username: 'Derrick',
  catagories: [
    {
      "activities": "Outdoors",
      "value": 30
    }, {
      "activities": "Nightlife",
      "value": 20
    }, {
      "activities": "Movies",
      "value": 65
    }, {
      "activities": "Board Games",
      "value": 39
    }, {
      "activities": "Dancing",
      "value": 19
    }, {
      "activities": "Sports",
      "value": 10
    }
  ],
  bio: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt numquam, fugit assumenda qui a, iste debitis perferendis eligendi earum officia laborum et ad recusandae excepturi, accusamus dignissimos voluptatum. Provident, deleniti.",
  email: "derrickytheodore@cool.com",
  gender: 'M',
  friends: [
    {
      userId: 2,
      username: 'Aaron',
      bio: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt numquam, fugit assumenda qui a, iste debitis perferendis eligendi earum officia laborum et ad recusandae excepturi, accusamus dignissimos voluptatum. Provident, deleniti.",
      email: "derrickytheodore@cool.com",
      gender: 'M',
      
    },
    {
      userId: 3,
      username: 'Jackie',
      bio: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt numquam, fugit assumenda qui a, iste debitis perferendis eligendi earum officia laborum et ad recusandae excepturi, accusamus dignissimos voluptatum. Provident, deleniti.",
      email: "derrickytheodore@cool.com",
      gender: 'M',
    },
    {
      userId: 4,
      username: 'Billy',
      bio: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt numquam, fugit assumenda qui a, iste debitis perferendis eligendi earum officia laborum et ad recusandae excepturi, accusamus dignissimos voluptatum. Provident, deleniti.",
      email: "derrickytheodore@cool.com",
      gender: 'M',
      
    }
  ],
  ///////////////////////////////
  //Add a catagory to events???//
  ///////////////////////////////
  events: [
    {
      eventId: 0,
      eventname: 'Aaron\'s Birthday',
      status: 'active',
      creatorid: 1,
      date: new Date(),
      capacity: 4,
      imgLink: 'eventImg.png',
    },
    {
      eventId: 3,
      eventname: 'Hike Everest',
      status: 'active',
      creatorid: 3,
      date: new Date(),
      capacity: 2,
      imgLink: 'eventImg.png',
    },
    {
      eventId: 5,
      eventname: 'Peter Dillons',
      status: 'active',
      creatorid: 2,
      date: new Date(),
      capacity: 4,
      imgLink: 'eventImg.png',
    },
  ]
}]