import React from 'react'
import './ProfileCard.scss'
import { Card } from 'react-bootstrap'

const ProfileCard = ({ user, google }) => {
  // Clean empty entires from user.
  user = user || {}
  Object.keys(user).forEach((key) => (!user[key]) && delete user[key]);

  let userData = {
    avatar: "https://via.placeholder.com/80x80text=User+Avatar",
    id: -1,
    city: 'No City Set..',
    bio: 'No Bio Yet...',
    nickname: 'notLoggedIn',
    username: 'Unknown User',
    banner: "https://via.placeholder.com/600x400text=User+Banner",
    ...(user)
  }

  return (
    <Card>
      <Card.Img className="profile-banner" style={{ maxHeight: '10%' }} variant="top" src={userData.banner} alt={`Banner for User #${userData.id}`} />
      <Card.Img className="profile-avatar" variant="top" src={userData.avatar} alt={`Avatar for User #${userData.id}`} />
      <Card.Body>
        <Card.Title>Profile</Card.Title>
        <Card.Text className="nickname">{'@' + userData.nickname}</Card.Text>
        <Card.Text className="username">{userData.username}</Card.Text>
        <Card.Text className="bio">{userData.bio}</Card.Text>
        <Card.Text className="city">{userData.city}</Card.Text>
      </Card.Body>
    </Card>
  )
}

export default ProfileCard