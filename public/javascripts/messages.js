var chatBox,
    chatList,
    chatWindow,
    sessionUser
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
        if (this.data && this.data.users) {
            this.data.users.map(user => {
                let li_user = document.createElement('li')
                li_user.innerHTML = user.username
                this.users.append(li_user)
            })
        }

        if (this.data && this.data.messages) {
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
        console.log('Made a chatlist:')
        console.table(this)
        if (!!this.data.chats) this.swapChat(this.data.chats[0]._id)
    }

    async populateData() {
        let chatInstance = await axios.get(`/api/chats/${_id}`).data
        this.setState(chatInstance, true)
    }

    swapChat(_id) {
        this.chatBox.setState(this.data.chats.find(chat => chat._id == _id))
    }

    createLayout() {
        this.main = document.createElement('div')
        this.main.className = "user-chats-list"
        this.chats = document.createElement('ul')
        this.main.appendChild(this.chats)
    }

    update() {
        if (this.data.chats) {
            this.data.chats.map(async chat => {
                let response = await axios.get(`/api/chat/${chat._id}`)
                chat = response.data
                let li_div = document.createElement('div')
                let li = document.createElement('li')
                let p_users = document.createElement('p')
                let button_chat = document.createElement('button')
                button_chat.onclick = function(event) { console.log(event ,this); this.swapChat(chat._id) }.bind(this)

                let userString = chat.users.map(user => user.username).filter(username => username != sessionUser.username).join('|')
                p_users.innerHTML = userString

                li.append(li_div)
                li_div.append(p_users)
                li_div.append(button_chat)
                this.chats.append(li_div)
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

window.onload = async function() {
    console.log('🧾 Loaded Messages Script 🧾')
    chatWindow = chatWindow ||  document.getElementById('chatWindow')
    sessionUser = await axios.get('/api/users/me')
    chatList = chatList || new ChatList(sessionUser.data)

    console.log(this.chatWindow)
    chatWindow.append(chatList.main)
    chatWindow.append(chatList.chatBox.main)
    setInterval(populateChatWindow, 3000)
}