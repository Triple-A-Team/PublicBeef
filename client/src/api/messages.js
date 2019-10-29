import service from './config'
import { isLoggedIn, getLocalStorageUser, getCurrentUser } from './users'


export const getMessages = () => {
    if (isLoggedIn()) {
        return getLocalStorageUser()
            .then(result => {
                return result.data.messages
            })
            .catch(error => {
                return error
            })
    } else throw new Error('Must log in to do that.')

}

export const getChats = () => {
    if (isLoggedIn()) {
        return getCurrentUser()
            .then(async user => {
                if (user.error) throw new Error('User not found.')
                else return await Promise.all((user.chats || []).map(async chatId => await getChat(chatId)))
            })
            .catch(error => {
                return error
            })
    } else throw new Error('Must log in to do that.')

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