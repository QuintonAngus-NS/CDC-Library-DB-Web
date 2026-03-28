const newProfileBtn = document.getElementById('addProfileBtn')
const bookProfilesBtn = document.getElementById('bookProfilesBtn')
const barcodeContinueBtn = document.getElementById('barcodeContinueBtn')
const profileContinueBtn = document.getElementById('profileCreationBtn')
const confirmConfirmBtn = document.getElementById('confirmConfirmBtn')
const confirmEditBtn = document.getElementById('confirmEditBtn')
const successHomeBtn = document.getElementById('successHomeBtn')
const successNewProfileBtn = document.getElementById('successNewProfileBtn')
const profilesHomeBtn = document.getElementById('profilesHomeBtn')
const searchBox = document.getElementById('searchBox')
const searchBtn = document.getElementById('searchBtn')

const barcodeConatiner = document.getElementById('barcodeContainer')
const dashBoardContainer = document.getElementById('dashBoardConatiner')
const profileCreationContainer = document.getElementById('profileCreationContainer')
const confirmationContainer = document.getElementById('confirmationContainer')
const loadingContainer = document.getElementById('loadingContainer')
const successContainer = document.getElementById('successContainer')
const bookProfilesContainer = document.getElementById('bookProfilesContainer')

const barcodeInput = document.getElementById('barcodeInput')
const bookNameInput = document.getElementById('bookNameInput')
const authorInput = document.getElementById('authorInput')

const confirmID = document.getElementById('confirmID')
const confirmName = document.getElementById('confirmName')
const confirmAuthor = document.getElementById('confirmAuthor')

let barcodeID = ''
let bookName = ''
let author = ''

function screenClear() {
    barcodeConatiner.style.display = 'none'
    dashBoardContainer.style.display = 'none'
    profileCreationContainer.style.display = 'none'
    confirmationContainer.style.display = 'none'
    loadingContainer.style.display = 'none'
    successContainer.style.display = 'none'
    bookProfilesContainer.style.display = 'none'
}

function barcodeEntryDisplay() {
    screenClear()
    barcodeConatiner.style.display = 'flex'
    barcodeInput.value = barcodeID
    barcodeInput.focus();
}

function profileCreationEnteryDisplay() {
    screenClear()
    profileCreationContainer.style.display = 'flex'
    bookNameInput.value = bookName
    authorInput.value = author
}

function confirmationDisplay() {
    screenClear()
    confirmationContainer.style.display = 'flex'
    confirmID.innerHTML = `BarcodeID: ${barcodeID}`
    confirmName.innerHTML = `Book: ${bookName}`
    confirmAuthor.innerHTML = `Author: ${author}`
}

function loading() {
    screenClear()
    loadingContainer.style.display = 'flex'
}

function successDisplay() {
    screenClear()
    successContainer.style.display = 'flex'
}

function homeDisplay() {
    screenClear()
    dashBoardContainer.style.display = 'flex'
}

async function updateConfirmBtn(e) {
    let nameUpdate = document.getElementById('nameInputUpdate')
                            
                            if (nameUpdate.value === '') {
                                nameUpdate = nameUpdate.placeholder
                            } else {
                                nameUpdate = nameUpdate.value
                            }

                            let authorUpdate = document.getElementById('authorEditInputUpdate')

                            if (authorUpdate.value === '') {
                                authorUpdate = authorUpdate.placeholder
                            } else {
                                authorUpdate = authorUpdate.value
                            }

                            let idUpdate = document.getElementById('idInputUpdate')

                            if (idUpdate.value === '') {
                                idUpdate = idUpdate.placeholder
                            } else {
                                idUpdate = idUpdate.value
                            }

                            const orignalID = e.target.id

                            const updateProfileRequest = await fetch('https://api.cdc.library.northern-star.online/updateProfile', {
                                method: 'POST',
                                headers: {'Content-Type':'application/json'},
                                body: JSON.stringify({
                                    name: nameUpdate,
                                    author: authorUpdate,
                                    id: idUpdate,
                                    orignalID: orignalID
                                })
                            })

                            const updateProfileResponse = await updateProfileRequest.json()

                            console.log(updateProfileResponse)

                            if (updateProfileResponse.error) {
                                console.log(updateProfileResponse.error)
                            } else {
                                bookProfilesDisplay()
                            }
}

async function bookProfilesDisplay() {
    loading()
    bookProfilesContainer.innerHTML = ''
    const profileData = await fetch('https://api.cdc.library.northern-star.online/profileData', {
        method: 'POST'
    })

    const profileDataResponse = await profileData.json()

    if (profileDataResponse.result === false) {
        console.log(profileDataResponse.error)
    } else {
        const data = profileDataResponse.data

        const title = document.createElement('div')
        title.classList.add('title')
        title.innerHTML = 'Book Profiles'
        bookProfilesContainer.appendChild(title)

        const subText = document.createElement('div')
        subText.classList.add('subText')
        subText.innerHTML = 'Below is all stored book profiles, including their barcodeID, name, and author.'
        bookProfilesContainer.appendChild(subText)

        const profiles = document.createElement('div')
        profiles.id = 'profiles'
        bookProfilesContainer.appendChild(profiles)

        if (data.length > 0) {
            profiles.innerHTML = ''
            data.forEach(profile => {
                const profileName = profile.book
                const profileAuthor = profile.author
                const profileID = profile.BarcodeID
                
                const profileWrapper = document.createElement('div')
                profileWrapper.classList.add('profileWrapper')

                const profileNameDiv = document.createElement('div')
                profileNameDiv.classList.add('profileName')
                profileNameDiv.innerHTML = profileName
                profileWrapper.appendChild(profileNameDiv)

                const profileAuthorDiv = document.createElement('div')
                profileAuthorDiv.classList.add('profileAuthor')
                profileAuthorDiv.innerHTML = `Author: ${profileAuthor}`
                profileWrapper.appendChild(profileAuthorDiv)

                const profileIDDIV = document.createElement('div')
                profileIDDIV.classList.add('profileID')
                profileIDDIV.innerHTML = `BarcodeID: ${profileID}`
                profileWrapper.appendChild(profileIDDIV)

                const profileBtnWrapper = document.createElement('div')
                profileBtnWrapper.classList.add('profileBtnWrapper')

                const deleteBtn = document.createElement('div')
                deleteBtn.id = profileID
                deleteBtn.classList.add('profilesHomeBtn')
                deleteBtn.innerHTML = 'Delete'
                profileBtnWrapper.appendChild(deleteBtn)

                const editBtn = document.createElement('div')
                editBtn.classList.add('profileEditBtn')
                editBtn.innerHTML = 'Edit'
                editBtn.id = profileID
                profileBtnWrapper.appendChild(editBtn)

                profileWrapper.appendChild(profileBtnWrapper)

                editBtn.addEventListener('click', async(e) => {
                    const editID = e.target.id

                    const IDLookup = await fetch('https://api.cdc.library.northern-star.online/IDLookup', {
                        method: 'POST',
                        headers: {'Content-Type':'application/json'},
                        body: JSON.stringify({id: editID})
                    })

                    const editIDResponse = await IDLookup.json()

                    if (editIDResponse.error) {
                        console.log(`error ocoured: ${editIDResponse.error}`)
                    } else {
                        const editData = editIDResponse.data[0]

                        bookProfilesContainer.innerHTML = ''

                        const title = document.createElement('div')
                        title.classList.add('title')
                        title.innerHTML = 'Edit profile'
                        bookProfilesContainer.appendChild(title)

                        const nameWrapper = document.createElement('div')
                        nameWrapper.classList.add('detailsInputWrapper')
                        bookProfilesContainer.appendChild(nameWrapper)

                        const nameTitle = document.createElement('div')
                        nameTitle.innerHTML = 'Name:'
                        nameTitle.classList.add('inputText')
                        nameWrapper.appendChild(nameTitle)

                        const nameInput = document.createElement('input')
                        nameInput.classList.add('profileInput')
                        nameInput.id = 'nameInputUpdate'
                        nameInput.placeholder = editData.book
                        nameWrapper.appendChild(nameInput)

                        const authorWrapper = document.createElement('div')
                        authorWrapper.classList.add('detailsInputWrapper')
                        bookProfilesContainer.appendChild(authorWrapper)

                        const authorTitle = document.createElement('div')
                        authorTitle.classList.add('inputText')
                        authorTitle.innerHTML = 'Author'
                        authorWrapper.appendChild(authorTitle)

                        const authorEditInput = document.createElement('input')
                        authorEditInput.classList.add('profileInput')
                        authorEditInput.id = 'authorEditInputUpdate'
                        authorEditInput.placeholder = editData.author
                        authorWrapper.appendChild(authorEditInput)

                        const idWrapper = document.createElement('div')
                        idWrapper.classList.add('detailsInputWrapper')
                        bookProfilesContainer.appendChild(idWrapper)

                        const idTitle = document.createElement('div')
                        idTitle.classList.add('inputText')
                        idTitle.innerHTML = 'ID'
                        idWrapper.appendChild(idTitle)

                        const idInput = document.createElement('input')
                        idInput.classList.add('profileInput')
                        idInput.id = 'idInputUpdate'
                        idInput.placeholder = editData.BarcodeID
                        idWrapper.appendChild(idInput)

                        const comment = document.createElement('div')
                        comment.classList.add('editComment')
                        comment.innerHTML = 'Note: any fields filled in with data will be edited, any fields left empty will NOT be edited or changed'
                        bookProfilesContainer.appendChild(comment)

                        const confirmBtn = document.createElement('div')
                        confirmBtn.classList.add('confirmUpdateBtn')
                        confirmBtn.innerHTML = 'Confirm'
                        confirmBtn.id = editData.BarcodeID
                        bookProfilesContainer.appendChild(confirmBtn)

                        confirmBtn.addEventListener('click', async (e) => {
                            updateConfirmBtn(e)

                        })
                    }
                })

                deleteBtn.addEventListener('click', async (e) => {
                    const deleteRequest = await fetch('https://api.cdc.library.northern-star.online/deleteRequest', {
                        method: 'POST',
                        headers: {'Content-Type':'application/json'},
                        body: JSON.stringify({id: e.target.id})
                    })
                    
                    const response = await deleteRequest.json()

                    if (response.error) {
                        console.log(`error ocoured: ${response.error}`)
                    } else {
                        bookProfilesDisplay()        
                    }
                })

                profiles.appendChild(profileWrapper)
            });
        } else {
            profiles.innerHTML = 'No data to display.'
        }
    }

    const btnWrapper = document.createElement('div')

    screenClear()
    bookProfilesContainer.style.display = 'flex'
    searchBox.focus()


}

function displayResults(results) {
profiles.innerHTML = ''
                    results.forEach(profile => {
                        const profileName = profile.book
                        const profileAuthor = profile.author
                        const profileID = profile.BarcodeID
                        
                        const profileWrapper = document.createElement('div')
                        profileWrapper.classList.add('profileWrapper')

                        const profileNameDiv = document.createElement('div')
                        profileNameDiv.classList.add('profileName')
                        profileNameDiv.innerHTML = profileName
                        profileWrapper.appendChild(profileNameDiv)

                        const profileAuthorDiv = document.createElement('div')
                        profileAuthorDiv.classList.add('profileAuthor')
                        profileAuthorDiv.innerHTML = `Author: ${profileAuthor}`
                        profileWrapper.appendChild(profileAuthorDiv)

                        const profileIDDIV = document.createElement('div')
                        profileIDDIV.classList.add('profileID')
                        profileIDDIV.innerHTML = `BarcodeID: ${profileID}`
                        profileWrapper.appendChild(profileIDDIV)

                        profiles.appendChild(profileWrapper)
                    });
}

async function search(searched) {
    const searchData = await fetch('https://api.cdc.library.northern-star.online/dataSearch', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({searched: searched})
    })

    const resultData = await searchData.json()

    displayResults(resultData.data)
}

newProfileBtn.addEventListener('click', () => {
    barcodeEntryDisplay()   
})

barcodeContinueBtn.addEventListener('click', () => {
    barcodeID = barcodeInput.value
    profileCreationEnteryDisplay()
})

profileContinueBtn.addEventListener('click', () => {
    bookName = bookNameInput.value
    author = authorInput.value
    confirmationDisplay()
})

confirmEditBtn.addEventListener('click', () => {
    barcodeEntryDisplay()
})

successHomeBtn.addEventListener('click', () => {
    homeDisplay()
})

successNewProfileBtn.addEventListener('click', () => {
    barcodeEntryDisplay()
})

bookProfilesBtn.addEventListener('click', () => {
    bookProfilesDisplay()
})

profilesHomeBtn.addEventListener('click', () => {
    homeDisplay()
})

confirmConfirmBtn.addEventListener('click', async () => {
    loading()
    profileAppend = await fetch('https://api.cdc.library.northern-star.online/profileAppend', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
            barcodeID: barcodeID,
            book: bookName,
            author: author
        })
    })

    const response = await profileAppend.json()

    if (response.result === true) {
        barcodeID = ''
        bookName = ''
        author = ''
        successDisplay()        
    } else {
        console.log('An error has ocoured:')
        console.log(response.error)
    }
})

searchBox.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        search(searchBox.value)
    }
})

searchBtn.addEventListener('click', () => {
    search(searchBox.value)
})

barcodeInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        barcodeID = barcodeInput.value
    profileCreationEnteryDisplay()
    }    
})

