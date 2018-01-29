import React from 'react';
import Chart from './Chart.jsx';
import AmChart from './AmChart.jsx';


const columns = [
  ['My Numbers', 30, 200, 100, 400, 150, 250],
  ['Your Numbers', 50, 20, 10, 40, 15, 25]
];

class Profile extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="profile_container">
        <div className="profile">
          <div className="profile_data">
            {/* <Chart columns={columns}/> */}
            <AmChart />
          </div>
          <div className="profile_image"> 
            <img src="stock-user-profile.jpg" alt=""/>
          </div>
          <div className="profile_bio">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati placeat quam quo nisi beatae harum officiis nostrum reiciendis repudiandae labore molestias deserunt ratione, ut voluptates numquam dicta. Minima, assumenda. Magni!
          </div>
          <div className="profile_events">
          </div>
          <div className="profile_friends">
          </div>
        </div>  
      </div>
    );
  }
}

//changed: from export @ class... 
export default Profile;

/**
 * 1) Profile Photo
 *  a) User can update profile
 * 2) serve up active events 
 * 3) Catagories of Interest
 *  a) User can edit/update their catagories
 * 4) visual analytics of past events participated in 
 */
