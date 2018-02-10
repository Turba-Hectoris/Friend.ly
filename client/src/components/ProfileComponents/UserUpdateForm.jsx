import React from 'react';

export const UserUpdateForm = ({ userDisplayedData }) => {
  return (
    <div>
      <form id="profile_form" action="" method="">
        <label >Bio:</label>
        <textarea name="bio" id="POST-textarea" cols="30" rows="10" placeholder={`${userDisplayedData.bio}`}>
        </textarea>
        <label >Username:</label> <input id="POST-username" type="text" name="username" placeholder={`${userDisplayedData.username}`}/>
        <hr/>
        <label >e-mail:</label> <input id="POST-email" type="text" name="email" placeholder={`${userDisplayedData.email}`}/>
        <fieldset>
          <legend>Gender</legend>
          <input type="radio" id="genderChoice1"
            name="gender" value="male"/>
          <label >Male</label>
          <input type="radio" id="genderChoice2"
            name="gender" value="female"/>
          <label>Female</label>
          <button type="submit" value=""/>
        </fieldset>
      </form>
    </div>
  );
}
export default UserUpdateForm;