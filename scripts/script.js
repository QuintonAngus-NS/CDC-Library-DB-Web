const newProfileBtn = document.getElementById('addProfileBtn')
const bookProfilesBtn = document.getElementById('bookProfilesBtn')
const barcodeContinueBtn = document.getElementById('barcodeContinueBtn')
const profileContinueBtn = document.getElementById('profileCreationBtn')
const confirmConfirmBtn = document.getElementById('confirmConfirmBtn')
const confirmEditBtn = document.getElementById('confirmEditBtn')
const successHomeBtn = document.getElementById('successHomeBtn')
const successNewProfileBtn = document.getElementById('successNewProfileBtn')

const barcodeConatiner = document.getElementById('barcodeContainer')
const dashBoardContainer = document.getElementById('dashBoardConatiner')
const profileCreationContainer = document.getElementById('profileCreationContainer')
const confirmationContainer = document.getElementById('confirmationContainer')
const loadingContainer = document.getElementById('loadingContainer')
const successContainer = document.getElementById('successContainer')
const bookProfilesContainer = document.getElementById('bookProfilesContainer')
const profiles = document.getElementById('profiles')

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

async function bookProfilesDisplay() {
    loading()
    const profileData = await fetch('https://api.cdc.library.northern-star.online/profileData', {
        method: 'POST'
    })

    const profileDataResponse = await profileData.json()

    if (profileDataResponse.result === false) {
        console.log(profileDataResponse.error)
    } else {
        const data = profileDataResponse.data
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

            profiles.appendChild(profileWrapper)
        });
    }

    screenClear()
    bookProfilesContainer.style.display = 'flex'


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



