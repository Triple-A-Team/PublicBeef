var C = document.createElement
var E = document.getElementsByClassName
var EE = document.getElementById

class RealtimeView {
    constructor(data) {
        this.data = data
        this.createLayout()
        this.update()
    }

    createLayout() {
        null;
    }

    update() {
        null;
    }
}
class Message extends RealtimeView {
    constructor(data) {
        super(data)
    }

    createLayout() {
        this.main = C('li')
        this.div = C('div')
        this.user = C('h1')
        this.content = C('p')
        this.main.appendChild(this.div)
        this.div.appendChild(this.userLabel)
        this.div.appendChild(this.messageContent)
    }

    update() {
        this.user.innerHTML = this.data.author.username
        this.content.innerHTML = this.data.message
    }
}
class ChatBox extends RealtimeView {
    constructor(_id) {
        let data = this.getData(_id)
        super(data)
    }

    async getData(_id) {
        return await axios.get(`/api/chats/${_id}`).data
    }

    async createMessage(content, user, chat) {
        let message = await axios.post('/api/messages/', { content, user, chat }).data
        this.update()
        return new Message(message)
    }

    createLayout() {
        this.main = C('div')
        this.users = C('ul')
        this.messages = C('ul')
        this.main.appendChild(this.userLabel)
        this.main.appendChild(this.messageContent)
    }

    update() {
        this.data.users.map(user => {
            let li_user = C('li')
            li_message.className = "chat-message"
            li_user.innerHTML = user.username
            this.users.appendChild(li_user)
        })

        this.data.messages.map(message => {
            this.messages.appendChild(new Message(message))
        })
    }
}

class ChatList extends RealtimeView {
    constructor(data, chatBox) {
        super(data)
        this.chatBox = chatBox
    }

    swapChat() {
        this.chatBox()
    }

    createLayout() {
        this.main = C('div')
        this.main.className = "user-chats-list"
        this.chats = C('ul')
        this.main.appendChild(this.chats)
    }

    update() {
        this.data.chats.map(chat => {
            let li_user = C('li')
            let chat_link = C('a')
            chat_link.href =
                li_message.className = "chat-message"
            li_user.innerHTML = user.username
            this.users.appendChild(li_user)
        })
    }
}

const populateChatWindow = async() => {
    let user = await axios.get('/api/users/me').data
    if (user) {
        chatBox = new ChatBox(user.chats[0])
        chatList = new ChatList(user, chatBox)
        EE('chatWindow').appendChild(chatList)
        EE('chatWindow').appendChild(chatBox)
    } else {
        console.log('need to login to get chats.')
    }
}