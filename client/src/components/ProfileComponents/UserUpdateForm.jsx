import React from 'react';

export const UserUpdateForm = (props) => {
  return (
    <div>
      <form id="profile_form" action={`http://localhost:1337/profile_update/${props.loggedInUserID}`} method="POST">
        <label >Bio:</label>
        <textarea name="bio" id="" cols="30" rows="10" placeholder={`${props.loggedInUserID.bio}`}>
        </textarea>
        <label >Username:</label> <input id="POST-username" type="text" name="username" placeholder={`${props.loggedInUserID.username}`}/>
        <hr/>
        <label >e-mail:</label> <input id="POST-email" type="text" name="email" placeholder={`${props.loggedInUserID.email}`}/>
        <fieldset>
          <legend>Gender</legend>
          <input type="radio" id="genderChoice1"
            name="gender" value="M"/>
          <label >Male</label>
          <input type="radio" id="genderChoice2"
            name="gender" value="F"/>
          <label>Female</label>
          <button type="submit" value="" />
        </fieldset>
      </form>
    </div>
  );
}