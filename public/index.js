window.addEventListener('DOMContentLoaded', event => {
    console.log('Connected')
})

window.onload = () => {
    pageContent();
    //createReplaceCatButton();
}

const pageContent = async () => {
    const section = document.createElement("section");
    section.setAttribute('class', 'container');
    document.body.appendChild(section);

    const h1 = document.createElement('h1')
    h1.setAttribute('class', 'heading')
    h1.innerText = 'Catstagram'
    section.appendChild(h1)

    const img = document.createElement('img')
    const url = await getCatImage()
    img.setAttribute('src', url)
    img.setAttribute('id', 'cat-pic')
    img.setAttribute('data-upvotes', 0)
    section.appendChild(img)

    createScoreContainer();
    createButtonsContainer();
    createReplaceCatButton()
    createUpVoteButton()
    createDownVoteButton()

    
};

async function getCatImage () {
    try {
    const res = await fetch('https://api.thecatapi.com/v1/images/search')
    const body = await res.json()
    const imgUrl = body[0]['url']
    return imgUrl;
    } catch(error) {
        console.log('Failure to retrieve cat image', e.message)
    }
}

const createButtonsContainer = function() {
    const buttonsSpan = document.createElement('span')
    //buttonsSpan.setAttribute('class', 'container')
    buttonsSpan.setAttribute('id', 'buttons-span')

    const section = document.body.querySelector('.container')
    section.appendChild(buttonsSpan)
}

const createScoreContainer = function() {
    const scoreDiv = document.createElement('div')
    scoreDiv.setAttribute('id', 'score-div')
    const p = document.createElement('p')
    p.textContent = 'Popularity Score: 0'
    scoreDiv.textContent = p.textContent

    const section = document.body.querySelector('.container')
    section.appendChild(scoreDiv)

}

const createReplaceCatButton = function() {
    const replaceCatBtn = document.createElement('button')
    replaceCatBtn.setAttribute('class', 'button')
    replaceCatBtn.setAttribute('id', 'add-cat')
    replaceCatBtn.innerText = 'REPLACE CAT'

    const refreshImg = document.createElement('img')
    refreshImg.setAttribute('class', 'button-image')
    refreshImg.setAttribute('src', 'https://as1.ftcdn.net/v2/jpg/02/52/31/24/1000_F_252312406_84kpql3vCpakGhh8XyT0QoKYIZ3rb3ga.jpg')
    replaceCatBtn.appendChild(refreshImg)

    const buttonContainer = document.body.querySelector('#buttons-span')
    buttonContainer.appendChild(replaceCatBtn)
    
    replaceCatBtn.addEventListener('click', replaceCatHandler)
}

const replaceCatHandler = async function(event) {
    const img = document.querySelector('#cat-pic')
    const newUrl = await getCatImage()
    img.setAttribute('src', newUrl)
    //Reset current image up/downvotes
    img.setAttribute('data-upvotes', 0)
    const scoreDiv = document.body.querySelector('#score-div')
    scoreDiv.innerText = `Popularity Score: ${parseInt(img.dataset.upvotes)}`
}

const createUpVoteButton = function() {
    const upVoteBtn = document.createElement('button')
    upVoteBtn.setAttribute('class', 'button')
    upVoteBtn.setAttribute('id', 'upvote')
    upVoteBtn.innerText = 'UPVOTE'

    const upImage = document.createElement('img')
    upImage.setAttribute('class', 'button-image')
    upImage.setAttribute('src', 'https://toppng.com/uploads/preview/reddit-clipart-icon-reddit-upvote-transparent-11562895696nryk8bvsps.png')
    upVoteBtn.appendChild(upImage)

    const buttonContainer = document.body.querySelector('#buttons-span')
    buttonContainer.appendChild(upVoteBtn)

    upVoteBtn.addEventListener('click', upVoteHandler)
}

const upVoteHandler = function(event) {
    const currentImg = document.body.querySelector('#cat-pic')
    currentImg.setAttribute('data-upvotes', parseInt(currentImg.dataset.upvotes) + 1)
    //console.log(currentImg.dataset.upvotes)
    const scoreDiv = document.body.querySelector('#score-div')
    scoreDiv.innerText = `Popularity Score: ${parseInt(currentImg.dataset.upvotes)}`
}

const createDownVoteButton = function() {
    const downVoteBtn = document.createElement('button')
    downVoteBtn.setAttribute('class', 'button')
    downVoteBtn.setAttribute('id', 'downvote')
    downVoteBtn.innerText = 'DOWNVOTE'

    const downImg = document.createElement('img')
    downImg.setAttribute('class', 'button-image')
    downImg.setAttribute('src', 'https://www.vhv.rs/dpng/d/127-1278380_reddit-downvote-transparent-hd-png-download.png')
    downVoteBtn.appendChild(downImg)

    const buttonContainer = document.body.querySelector('#buttons-span')
    buttonContainer.appendChild(downVoteBtn)

    downVoteBtn.addEventListener('click', downVoteHandler)
}

const downVoteHandler = function(event) {
    const currentImg = document.body.querySelector('#cat-pic')
    currentImg.setAttribute('data-upvotes', parseInt(currentImg.dataset.upvotes) - 1)
    //console.log(currentImg.dataset.upvotes)
    const scoreDiv = document.body.querySelector('#score-div')
    scoreDiv.innerText = `Popularity Score: ${parseInt(currentImg.dataset.upvotes)}`
}
