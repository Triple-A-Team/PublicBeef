const users = []

// addUser
const addUser = ({ id, username, room }) => {
    // Validate the data
    if (!username || !room) {
        return { error: "Username and room are required!" }
    }

    // Clean the data
    username = username.trim().toLowerCase()
    room = room.trim().toLowerCase()

    // Check for existing user
    const existingUser = users.find(user => user.room === room && user.username === username)

    if (existingUser) {
        return {
            error: "Username is in use!"
        }
    }

    const user = { id, username, room }
    users.push(user)
    return { user }
}

// removeUser
const removeUser = (id) => {
    const index = users.findIndex((user) => id === user.id)
    if (index >= 0) {
        return users.splice(index, 1)[0]
    }
    else {
        return {
            error: "User does not exist."
        }
    }
}

// getUser
const getUser = (id) => {
    return users.find((user) => id === user.id)
}

// getUsersInRoom
const getUsersInRoom = (room) => {
    room = room.trim().toLowerCase()
    return users.filter((user) => user.room === room)
}

// getRoom
const getRooms = (room) => {
    return [...new Set(getUsersInRoom(room).map((user) => user.room))]
}

module.exports = {
    addUser,
    getUsersInRoom,
    getUser,
    removeUser,
    getRooms
}