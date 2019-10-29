const path = require('path')
const bcrypt = require('bcryptjs')
const faker = require('faker');
require('dotenv').config({ path: path.join(__dirname, '../.env') })
require('../configs/database')

const User = require('../models/User')
const Post = require('../models/Post')
const Comment = require('../models/Comment')
const Chat = require('../models/Chat')
const Message = require('../models/ChatMessage')

const { submitDocuments, seed, databaseEntries, generateUniqueNumberList, getRandomElement } = require('./seed_helpers')

faker.seed(123);
const bcryptSalt = 10

async function createDBEntries() {

    await submitDocuments('users', User, Array.from({ length: 200 }).map(() => {
        return {
            username: faker.name.findName(),
            password: bcrypt.hashSync(faker.internet.password(), bcrypt.genSaltSync(bcryptSalt)),
            email: faker.internet.email(),
            avatar: faker.internet.avatar(),
            location: { coordinates: [faker.random.number({ min: -180, max: 180 }), faker.random.number({ min: -90, max: 90 })] }
        }
    }))

    await submitDocuments('posts', Post, Array.from({ length: 300 }).map((e, i) => {
        const user = databaseEntries.users[i % databaseEntries.users.length]
        return {
            title: faker.lorem.sentence(),
            content: faker.lorem.paragraph(),
            image: faker.image.nightlife(),
            author: user._id,
            location: user.location
        }
    }))

    await submitDocuments('comments', Comment, Array.from({ length: 1000 }).map((e, i) => {
        return {
            content: faker.lorem.paragraph(),
            post: databaseEntries.posts[i % databaseEntries.posts.length]._id,
            author: databaseEntries.users[Math.floor(Math.random() * databaseEntries.users.length)]._id
        }
    }))

    await submitDocuments('chats', Chat, Array.from({ length: 30 }).map(() => {
        const userIndices = generateUniqueNumberList(Math.floor(Math.random() * 10), 0, databaseEntries.users.length)
        return {
            name: faker.lorem.word(),
            users: userIndices.map(user => databaseEntries.users[user]._id)
        }
    }))

    await submitDocuments('messages', Message, Array.from({ length: 1000 }).map((e, i) => {
        return {
            content: faker.lorem.paragraph(),
            chat: databaseEntries.chats[i % databaseEntries.chats.length]._id,
            author: getRandomElement(databaseEntries.chats[i % databaseEntries.chats.length].users)
        }
    }))
}

seed(createDBEntries)