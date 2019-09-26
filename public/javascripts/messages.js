var chatBox,
    chatList,
    chatWindow = document.getElementById('chatWindow')
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
        this.main = document.createElement('li')
        this.div = document.createElement('div')
        this.user = document.createElement('h1')
        this.content = document.createElement('p')
        this.main.append(this.div)
        this.div.append(this.userLabel)
        this.div.append(this.messageContent)
    }

    update() {
        this.user.innerHTML = this.data.author.username
        this.content.innerHTML = this.data.message
    }
}

class ChatBox extends RealtimeView {
    constructor(data) {
        super(data)
        console.log('Made a chatbox:')
        console.table(this)
    }

    async populateData(_id) {
        let result = await axios.get(`/api/chats/${_id}`)
        this.setState(result.data, true)
    }

    async createMessage(content, user, chat) {
        await axios.post('/api/messages/', { content, user, chat }).data
        this.populateData(this.data._id)
    }

    createLayout() {
        this.main = document.createElement('div')
        this.users = document.createElement('ul')
        this.messages = document.createElement('ul')
        this.main.append(this.userLabel)
        this.main.append(this.messageContent)
    }

    update() {
        if (this.data) {
            this.data.users.map(user => {
                let li_user = document.createElement('li')
                li_message.className = "chat-message"
                li_user.innerHTML = user.username
                this.users.append(li_user)
            })

            this.data.messages.map(message => {
                this.messages.append(new Message(message))
            })
        }
    }
}

class ChatList extends RealtimeView {
    constructor(userModel) {
        super(userModel)
        this.chatBox = new ChatBox()
        this.swapChat(this.data.chats[0]._id)
        console.log('Made a chatlist:')
        console.table(this)
    }

    async populateData() {
        let chatInstance = await axios.get(`/api/chats/${_id}`).data
        this.setState(chatInstance, true)
    }

    swapChat(_id) {
        chat = this.data.chats.find(chat => chat._id.equals(name))
        this.chatBox.setState(chat)
    }

    createLayout() {
        this.main = document.createElement('div')
        this.main.className = "user-chats-list"
        this.chats = document.createElement('ul')
        this.main.appendChild(this.chats)
    }

    update() {
        if (this.data.chats) {
            this.data.chats.map(chat => {
                let li_user = document.createElement('li')
                let button_chat = document.createElement('button')
                console.log(button_chat)

                button_chat.onclick = function(event) {
                    this.swapChat(chat._id)
                }

                li_message.className = "chat-message"
                li_user.innerHTML = user.username
                this.users.append(li_user)
                this.users.append(ahref_chat)
            })
        } else console.log('User is not a part of any chats.')
    }
}

var populateChatWindow = async() => {
    let user = await axios.get('/api/users/me')
    if (user) {
        chatList.setState(user.data, true)
    } else {
        console.log('need to login to get chats.')
    }
}

window.onload = function() {
    let user = await axios.get('/api/users/me')
    chatList = new ChatList(user.data)
    chatWindow.append(chatList)
    chatWindow.append(chatList.chatBox)

    console.log('loaded messages script.')
    setInterval(populateChatWindow, 1000)
}