window.addEventListener('DOMContentLoaded', event => {
    console.log('Connected')
})

window.onload = () => {
    pageContent();
}

const pageContent = async () => {
    const section = document.createElement("section");
    section.setAttribute('class', 'container');
    document.body.appendChild(section);

    const h1 = document.createElement('h1')
    h1.setAttribute('class', 'heading')
    h1.innerText = 'Catsagram'
    section.appendChild(h1)

    const img = document.createElement('img')
    const url = await getCatImage()
    img.setAttribute('src', url)
    img.setAttribute('id', 'cat-pic')
    section.appendChild(img)

    createReplaceCatButton()
    createUpVoteButton()
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

const createReplaceCatButton = function() {
    const replaceCatBtn = document.createElement('button')
    replaceCatBtn.setAttribute('class', 'button')
    replaceCatBtn.setAttribute('id', 'add-cat')
    replaceCatBtn.innerText = 'REPLACE CAT'

    const section = document.body.querySelector('.container')
    section.appendChild(replaceCatBtn)
    const buttonContainer = document.body.querySelector('#buttons-span')
    buttonContainer.appendChild(replaceCatBtn)
    
    replaceCatBtn.addEventListener('click', replaceCatHandler)
}

const replaceCatHandler = async function(event) {
    const img = document.querySelector('#cat-pic')
    const newUrl = await getCatImage()
    //event.target.setAttribute('src', newUrl)
    img.setAttribute('src', newUrl)
    //Reset current image up/downvotes
    img.setAttribute('data-upvotes', 0)
}

const createUpVoteButton = function() {
    const upVoteBtn = document.createElement('button')
    upVoteBtn.setAttribute('class', 'button')
    upVoteBtn.setAttribute('id', 'upvote')
    upVoteBtn.innerText = 'UPVOTE'

    const section = document.body.querySelector('.container')
    section.appendChild(upVoteBtn)
    const buttonContainer = document.body.querySelector('#buttons-span')
    buttonContainer.appendChild(upVoteBtn)

    upVoteBtn.addEventListener('click', upVoteHandler)

}

const upVoteHandler = function(event) {
    const currentImg = document.body.querySelector('#cat-pic')
    currentImg.setAttribute('data-upvotes', parseInt(currentImg.dataset.upvotes) + 1)
    console.log(currentImg.dataset.upvotes)
}
