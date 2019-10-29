const socket = io()

const $messageForm = document.querySelector("#message-form");
const $message = $messageForm.querySelector('input');
const $messageFormButton = $messageForm.querySelector('button');
const $locationButton = document.querySelector("#send-location");
const $userList = document.getElementById('userlist');
const $messages = document.querySelector('#messages');

// Templates
const $messageTemplate = document.querySelector('#message-template').innerHTML;
const $locationTemplate = document.querySelector('#location-template').innerHTML;
const $serverTemplate = document.querySelector('#server-template').innerHTML;
const $sidebarTemplate = document.querySelector('#sidebar-template').innerHTML;
// Options
const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true })

const $messageTemplateLUT = {
    'server': $serverTemplate,
    'message': $messageTemplate,
    'location': $locationTemplate
}

const autoscroll = () => {
    const $newMessage = $messages.lastElementChild
    const newMessageStyles = getComputedStyle($newMessage)
    const newMessageMargin = parseInt(newMessageStyles.marginBottom)
    const newMessageHeight = $newMessage.offsetHeight + newMessageMargin
    
    const visibleHeight = $messages.offsetHeight
    const containerHeight = $messages.scrollHeight

    const scrollOffset = $messages.scrollTop + visibleHeight
    if (containerHeight - newMessageHeight <= scrollOffset) {
        $messages.scrollTop = $messages.scrollHeight
    }
}

const server_callback = (message) => {
    console.log(`Server: ${message}`)
}

socket.on('update-username', (username) => {
    socket.username = username
})

socket.on('emit-message', (message) => {
    const html = Mustache.render($messageTemplateLUT[message.type], {
        message: message.message,
        user: message.username,
        createdAt: '(' + moment(message.createdAt).format('hh:mm:ss:SS a') + ')'
    });
    $messages.insertAdjacentHTML('beforeend', html);
    autoscroll()
})

$messageForm.addEventListener('submit', (e) => {
    e.preventDefault()
    if ($message.value) {
        $messageFormButton.setAttribute('disabled', 'disabled');
        socket.emit('socket-message', $message.value, (message) => {
            $messageFormButton.removeAttribute('disabled')
            $message.value = '';
            $message.focus();
            server_callback(message)
        });
    }
})

$locationButton.addEventListener('click', (e) => {
    if (!navigator.geolocation) {
        return alert('Your browser does not support geolocation.')
    }
    $locationButton.setAttribute('disabled', 'disabled');

    navigator.geolocation.getCurrentPosition((position) => {
        socket.emit('sendLocation', {
            lat: position.coords.latitude,
            lon: position.coords.longitude
        }, (message) => {
            $locationButton.removeAttribute('disabled')
            server_callback(message)
        })
    })
})

socket.on('update-users', ({users, user}) => {
    const html = Mustache.render($sidebarTemplate, {
        users,
        room: user.room
    })
    document.querySelector('#sidebar').innerHTML = html
})

socket.emit('join', { username, room }, (message) => {
    if (message.error) {
        alert(message.error)
        location.href = '/'
    }
    server_callback(message)
})