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
            location: { coordinates: [faker.finance.amount(-80.03, -81.84, 6), faker.finance.amount(25.13, 27.12, 6)] }
        }
    }))

    await submitDocuments('posts', Post, Array.from({ length: 1000 }).map((e, i) => {
        const user = databaseEntries.users[i % databaseEntries.users.length]
        return {
            title: `${faker.hacker.verb()} ${faker.company.catchPhraseDescriptor()} ${faker.hacker.adjective()} ${faker.hacker.noun()}`,
            content: faker.lorem.paragraph(),
            image: `https://loremflickr.com/320/240?lock=${Math.floor(Math.random()*1000)}&random=${Math.floor(Math.random()*1000)}`,
            author: user._id,
            location: user.location
        }
    }))

    await submitDocuments('comments', Comment, Array.from({ length: 5000 }).map((e, i) => {
        return {
            content: faker.hacker.phrase(),
            post: databaseEntries.posts[i % databaseEntries.posts.length]._id,
            author: databaseEntries.users[Math.floor(Math.random() * databaseEntries.users.length)]._id
        }
    }))

    await submitDocuments('chats', Chat, Array.from({ length: 30 }).map(() => {
        const userIndices = generateUniqueNumberList(Math.floor(Math.random() * 10), 0, databaseEntries.users.length)
        return {
            name: faker.company.catchPhraseDescriptor(),
            users: userIndices.map(user => databaseEntries.users[user]._id)
        }
    }))

    await submitDocuments('messages', Message, Array.from({ length: 1000 }).map((e, i) => {
        return {
            content: faker.hacker.phrase(),
            chat: databaseEntries.chats[i % databaseEntries.chats.length]._id,
            author: getRandomElement(databaseEntries.chats[i % databaseEntries.chats.length].users)
        }
    }))
}

seed(createDBEntries)