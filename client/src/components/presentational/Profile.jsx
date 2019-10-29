import React from 'react'

const Profile = ({ user }) => {
  return (
    <div class="col-3 mx-0 px-0 profile">
      <div class="columns-container">
        <div class="column-title">
          <h1>Profile</h1>
        </div>
        <div class="header">
          <img src={user.banner || "https://via.placeholder.com/600x400text=User+Banner"} alt={`Banner for User #${user.id}`} height="100%" width="100%" />
          <div class="image-container">
            <img class="avatar" src={user.avatar || "https://via.placeholder.com/80x80text=User+Avatar"} alt={`Avatar for User #${user.id}`} />
          </div>
        </div>
        <div class="user-info">
          <div class="container-fluid d-flex flex-column justify-content-center">
            <h1 class="nickname">{user.nickname}</h1>
            <h1 class="username">{user.username}</h1>
            <h1 class="bio">{user.bio}</h1>
            <h1 class="city"><i class="fas fa-map-marker-alt"></i>{user.city}</h1>
          </div>
        </div>
        <div id='map'></div>
      </div>
    </div>
  )
}

export default Profile