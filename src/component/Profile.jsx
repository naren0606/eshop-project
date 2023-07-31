import React, { useState } from 'react';

const Profile = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handlePasswordChange = (e) => {
    e.preventDefault();

    // Check if the new password and confirm password match
    if (newPassword !== confirmPassword) {
      alert('New password and confirm password do not match.');
      return;
    }

    // Perform password change logic here
    // You can make an API request or update the password in the desired way

    // Reset the form fields
    setOldPassword('');
    setNewPassword('');
    setConfirmPassword('');

    alert('Password changed successfully.');
  };

  return (
    <div>
      <h2>Profile</h2>
      <p>Name: John Doe</p>
      <p>Email: john.doe@example.com</p>
      <p>Phone: 1234567890</p>

      <h3>Change Password</h3>
      <form onSubmit={handlePasswordChange}>
        <div>
          <label htmlFor="oldPassword">Old Password:</label>
          <input
            type="password"
            id="oldPassword"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="newPassword">New Password:</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="submit">Change Password</button>
      </form>
    </div>
  );
};

export default Profile;
