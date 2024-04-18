const baseUrl = 'http://localhost:3030/jsonstore/games'
const gamesListElement = document.getElementById('games-list')
const loadButton = document.getElementById('load-games')
const addGameButton = document.getElementById('add-game')
const editGameButton = document.getElementById('edit-game')
const nameInput = document.getElementById('g-name')
const typeInput = document.getElementById('type')
const playersInput = document.getElementById('players')
const idForm = document.getElementById('form')


const load = async() => {
    const response = await fetch(baseUrl)
    const result = await response.json()

    gamesListElement.innerHTML = ''

    Object.values(result).forEach(element => {
        const changeButton = document.createElement('button')
        changeButton.classList.add('change-btn')
        changeButton.textContent = 'Change'

        const deleteButton = document.createElement('button')
        deleteButton.classList.add('delete-btn')
        deleteButton.textContent = 'Delete'

        const divButtons = document.createElement('div')
        divButtons.classList.add('buttons-container')

        divButtons.appendChild(changeButton)
        divButtons.appendChild(deleteButton)

        const pName = document.createElement('p')
        pName.textContent = element.name

        const pPlayers = document.createElement('p')
        pPlayers.textContent = element.players

        const pType = document.createElement('p')
        pType.textContent = element.type

        const divContent = document.createElement('div')
        divContent.classList.add('content')

        divContent.appendChild(pName)
        divContent.appendChild(pPlayers)
        divContent.appendChild(pType)

        const divGame = document.createElement('div')
        divGame.classList.add('board-game')

        divGame.appendChild(divContent)
        divGame.appendChild(divButtons)

        gamesListElement.appendChild(divGame)

        changeButton.addEventListener('click', () => {
            idForm.setAttribute('data-id', element._id)

            nameInput.value = element.name
            typeInput.value = element.type
            playersInput.value = element.players

            divGame.remove()

            addGameButton.setAttribute('disabled', 'disabled')
            editGameButton.removeAttribute('disabled')
        })

        deleteButton.addEventListener('click', async() => {
            const elementId = element._id
            const response = await fetch(`${baseUrl}/${elementId}`, {
                method: 'DELETE'
            })
            divGame.remove()
        })
    })
}

loadButton.addEventListener('click', load)

addGameButton.addEventListener('click', async() => {
    if (nameInput.value === '' || typeInput.value === '' || playersInput.value === ''){
        return
    }

    const response = await fetch(baseUrl, {
        method: 'POST',
        headers: {'content-type': 'aplication/json'},
        body: JSON.stringify({
            name: nameInput.value,
            players: playersInput.value,
            type: typeInput.value,
        })
    })
    
    nameInput.value = ''
    typeInput.value = ''
    playersInput.value = ''

    load()
})

editGameButton.addEventListener('click', async() => {
    let currentId = idForm.getAttribute('data-id')

    const response = await fetch(`${baseUrl}/${currentId}`, {
        method: 'PUT',
        headers: {'content-type': 'aplication/json'},
        body: JSON.stringify({
            name: nameInput.value,
            players: playersInput.value,
            type: typeInput.value,
            _id: currentId,
        })
    })

    nameInput.value = ''
    typeInput.value = ''
    playersInput.value = ''

    idForm.removeAttribute('data-id')

    addGameButton.removeAttribute('disabled')
    editGameButton.setAttribute('disabled', 'disabled')

    load()
})