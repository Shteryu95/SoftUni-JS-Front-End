const baseUrl = 'http://localhost:3030/jsonstore/gifts'
const loadButtonElement = document.getElementById("load-presents")
const changeButtonElement = document.getElementById("change-btn")
const deleteButtonElement = document.getElementById("delete-btn")
const giftsElement = document.getElementById("gift-list")
const addPresentElement = document.getElementById("add-present")
const inputGift = document.getElementById("gift")
const inputFor = document.getElementById("for")
const inputPrice = document.getElementById("price")
const editButton = document.getElementById("edit-present")
const formElement = document.getElementById('form')


const loadButton = async() => {
    const response = await fetch(baseUrl)
    const result = await response.json()

    giftsElement.innerHTML = ''

    for (const element of Object.values(result)) {
        const changeButton = document.createElement('button')
        changeButton.classList.add('change-btn')
        changeButton.textContent = 'Change'

        const deleteButton = document.createElement('button')
        deleteButton.classList.add('delete-btn')
        deleteButton.textContent = 'Delete'

        const divButtonsContainer = document.createElement('div')
        divButtonsContainer.classList.add('buttons-container')

        divButtonsContainer.appendChild(changeButton)
        divButtonsContainer.appendChild(deleteButton)

        const gift = document.createElement('p')
        gift.textContent = element.gift
        const name = document.createElement('p')
        name.textContent = element.for
        const price = document.createElement('p')
        price.textContent = element.price

        const divContent = document.createElement('div')
        divContent.classList.add('content')

        divContent.appendChild(gift)
        divContent.appendChild(name)
        divContent.appendChild(price)

        const giftSock = document.createElement('div')
        giftSock.classList.add('gift-sock')

        giftSock.appendChild(divContent)
        giftSock.appendChild(divButtonsContainer)

        giftsElement.appendChild(giftSock)

        changeButton.addEventListener('click', () => {
            formElement.setAttribute('data-id', element._id)

            inputGift.value = element.gift
            inputFor.value = element.for
            inputPrice.value = element.price

            addPresentElement.setAttribute('disabled', 'disabled')
            editButton.removeAttribute('disabled')

            giftSock.remove()
        })

        deleteButton.addEventListener('click', async () => {
            const currentId = element._id
            await fetch(`${baseUrl}/${currentId}`, {
                method: 'DELETE'
            })

            giftSock.remove()
        })
    }
}

loadButtonElement.addEventListener('click', loadButton)

editButton.addEventListener('click', async() => {
    const giftId = formElement.getAttribute('data-id')
    
    await fetch(`${baseUrl}/${giftId}`, {
        method: 'PUT',
        headers: {
            'content-type': 'aplication/json'
        },
        body: JSON.stringify({
            _id: giftId,
            gift: inputGift.value,
            for: inputFor.value,
            price: inputPrice.value,
        })
    })

    addPresentElement.removeAttribute('disabled')
    editButton.setAttribute('disabled', 'disabled')

    formElement.removeAttribute('data-id')

    inputGift.value = ''
    inputFor.value = ''
    inputPrice.value = ''
    
    loadButton()
    
})


addPresentElement.addEventListener('click', async() => {
    if (inputGift.value === '' || inputFor.value === '' || inputPrice.value ==='') {
        return
    }

    await fetch(baseUrl, {
        method: 'POST',
        headers: {
            'content-type': 'aplication/json'
        },
        body: JSON.stringify({
            gift: inputGift.value,
            for: inputFor.value,
            price: inputPrice.value,
        })
    })

    inputGift.value = ''
    inputFor.value = ''
    inputPrice.value = ''

    loadButton()
    
})