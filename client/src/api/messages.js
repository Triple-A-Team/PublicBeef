import service from './config'
import { getLocalStorageUser, getCurrentUser } from './users'


export const getMessages = () => {
    return getLocalStorageUser()
        .then(result => {
            return result.data.messages
        })
        .catch(error => {
            return error
        })
}

export const getChats = async () => {
    return await getCurrentUser()
        .then(async user => await Promise.all(user.chats.map(async chatId => await getChat(chatId))))
        .catch(error => {
            return error
        })

}

export const getChat = (chat) => {
    return service.get(`/api/chat/${chat._id}`)
        .then(result => {
            return result.data
        })
        .catch(error => {
            return error
        })
}