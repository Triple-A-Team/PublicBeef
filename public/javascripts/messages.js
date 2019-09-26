var C = document.createElement
var E = document.getElementsByClassName
var EE = document.getElementById
var chatBox,
    chatList
class RealtimeView {
    constructor(data) {
        this.data = data
        this.createLayout()
        this.render()
    }

    createLayout() {
        null;
    }

    update() {
        null;
    }

    setState(state, overwrite) {
        this.data = overwrite ? state : {...this.data, ...state }
        this.render()
    }

    render() {
        try {
            this.update()
        } catch (err) {
            console.log(err)
        }
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
    constructor() {
        super(data)
    }

    async populateData(_id) {
        let chatInstance = await axios.get(`/api/chats/${_id}`).data
        this.setState(chatInstance, true)
    }

    async createMessage(content, user, chat) {
        await axios.post('/api/messages/', { content, user, chat }).data
        this.populateData(this.data._id)
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
    constructor(userModel, chatBox) {
        super(userModel)
        this.chatBox = chatBox
    }

    populateData() {
        let chatInstance = await axios.get(`/api/chats/${_id}`).data
        this.setState(chatInstance, true)
    }

    swapChat(_id) {
        chat = this.data.chats.find(chat => chat._id.equals(name))
        this.chatBox.setState(chat)
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
            let button_chat = C('button')

            chat_link.onclick = function(event) {
                this.swapChat('chat._id')
            }

            li_message.className = "chat-message"
            li_user.innerHTML = user.username
            this.users.appendChild(li_user)
            this.users.appendChild(ahref_chat)
        })
    }
}

const populateChatWindow = async() => {
    let user = await axios.get('/api/users/me').data
    if (user) {
        console.log(`User found ${user}`)
        chatBox = chatBox || new ChatBox()
        console.log(`Made ChatBox ${chatBox}`)
        chatList = chatList || new ChatList(user, chatBox)
        console.log(`Made ChatList ${chatList}`)
        EE('chatWindow').appendChild(chatList)
        EE('chatWindow').appendChild(chatBox)
    } else {
        console.log('need to login to get chats.')
    }
}