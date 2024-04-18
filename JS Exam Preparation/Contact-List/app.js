window.addEventListener("load", solve);

function solve() {
    const ulElement = document.getElementById('check-list')
    const nameInput = document.getElementById('name')
    const phoneInput = document.getElementById('phone')
    const categoryInput = document.getElementById('category')
    const addButton = document.getElementById('add-btn')
    const contactList = document.getElementById('contact-list')

    addButton.addEventListener('click', () => {
        const editButton = document.createElement('button')
        editButton.classList.add('edit-btn')

        const saveButton = document.createElement('button')
        saveButton.classList.add('save-btn')

        const divButtons = document.createElement('div')
        divButtons.classList.add('buttons')

        divButtons.appendChild(editButton)
        divButtons.appendChild(saveButton)

        const pName = document.createElement('p')
        pName.textContent = `name:${nameInput.value}`
        let taskName = nameInput.value

        const pPhone = document.createElement('p')
        pPhone.textContent = `phone:${phoneInput.value}`
        let taskPhone = phoneInput.value

        const pCategory = document.createElement('p')
        pCategory.textContent = `category:${categoryInput.value}`
        let taskCategory = categoryInput.value

        const articleElement = document.createElement('article')
        articleElement.appendChild(pName)
        articleElement.appendChild(pPhone)
        articleElement.appendChild(pCategory)

        const liElement = document.createElement('li')
        liElement.appendChild(articleElement)
        liElement.appendChild(divButtons)

        ulElement.appendChild(liElement)

        nameInput.value = ''
        phoneInput.value = ''
        categoryInput.value = ''

        editButton.addEventListener('click', () => {
            nameInput.value = taskName
            phoneInput.value = taskPhone
            categoryInput.value = taskCategory

            liElement.remove()
        })

        saveButton.addEventListener('click', () => {
            liElement.removeChild(divButtons)

            const deleteButton = document.createElement('button')
            deleteButton.classList.add('del-btn')

            liElement.appendChild(deleteButton)
            contactList.appendChild(liElement)

            deleteButton.addEventListener('click', () => {
                contactList.removeChild(liElement)
            })
        })
    })
}
  