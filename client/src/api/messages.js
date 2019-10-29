import service from './config'
import { getCurrentUser } from './users'


export const getMessages = () => {
    return getCurrentUser()
        .then(result => {
            return result.data.messages
        })
        .catch(error => {
            return error
        })
}

export const getChats = () => {
    return getCurrentUser()
        .then(result => {
            try {
                return result.data.chats
            } catch (error){
                return []
            }
        })
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