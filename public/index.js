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
    h1.innerText = 'Catstagram'
    section.appendChild(h1)
    const img = document.createElement('img')
    img.setAttribute('id', 'cat-pic')

    if (!localStorage.getItem('imgUrl')) {
    const url = await getCatImage()
    img.setAttribute('src', url)
    localStorage.setItem('imgUrl', url)
    localStorage.setItem('upvotes', 0)
    //REPLACE img.setAttribute('data-upvotes', 0)
    } else {
        img.setAttribute('src', localStorage.getItem('imgUrl'))
    }
    section.appendChild(img)

    createScoreContainer();
    createButtonsContainer();
    createReplaceCatButton()
    createUpVoteButton()
    createDownVoteButton()
    createCommentContainer();
    addCommentButton()
    createCommentSection()

    
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
    buttonsSpan.setAttribute('id', 'buttons-span')

    const section = document.body.querySelector('.container')
    section.appendChild(buttonsSpan)
}

const createScoreContainer = function() {
    const scoreDiv = document.createElement('div')
    scoreDiv.setAttribute('id', 'score-div')
    const p = document.createElement('p')
    p.textContent = `Popularity Score: ${localStorage.getItem('upvotes')}`
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
    localStorage.setItem('imgUrl', newUrl)
    img.setAttribute('src', localStorage.getItem('imgUrl'))
    localStorage.setItem('upvotes', 0)
    //Reset current image up/downvotes
    //REPlACE img.setAttribute('data-upvotes', 0)
    const scoreDiv = document.body.querySelector('#score-div')
    scoreDiv.innerText = `Popularity Score: ${parseInt(localStorage.getItem('upvotes'))}`
    const commentList = document.body.querySelector('#commentList')
    commentList.innerHTML = ''
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
    //REPLACE currentImg.setAttribute('data-upvotes', parseInt(currentImg.dataset.upvotes) + 1)
    localStorage.setItem('upvotes', parseInt(localStorage.getItem('upvotes')) + 1)
    const scoreDiv = document.body.querySelector('#score-div')
    scoreDiv.innerText = `Popularity Score: ${parseInt(localStorage.getItem('upvotes'))}`
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
    //REPLACE currentImg.setAttribute('data-upvotes', parseInt(currentImg.dataset.upvotes) - 1)
    localStorage.setItem('upvotes', parseInt(localStorage.getItem('upvotes')) - 1)
    const scoreDiv = document.body.querySelector('#score-div')
    scoreDiv.innerText = `Popularity Score: ${parseInt(localStorage.getItem('upvotes'))}`
}

const createCommentContainer = function() {
    const commentSpan = document.createElement('span')
    commentSpan.setAttribute('id', 'comment-span')

    const section = document.body.querySelector('.container')
    section.appendChild(commentSpan)
}

const createCommentSection = function() {
    const commentSection = document.createElement('section')
    commentSection.setAttribute('id', 'comment-section')

    const subHeading = document.createElement('h3')
    subHeading.setAttribute('id', 'subHeading')
    subHeading.innerText = 'Comment Section:'
    commentSection.appendChild(subHeading)

    const commentList = document.createElement('ul')
    commentList.setAttribute('id', 'commentList')
    commentList.style = "list-style: none;"
    commentSection.appendChild(commentList)
    

    const section = document.body.querySelector('.container')
    section.appendChild(commentSection)
}

const addCommentButton = function() {
    const commentInput = document.createElement('input')
    commentInput.setAttribute('id', 'commentInput')
    commentInput.classList.add('comment-element');
    commentInput.setAttribute('placeholder', 'Add a comment...')

    const commentLabel = document.createElement('label')
    commentLabel.setAttribute('id', 'commentLabel')
    commentLabel.classList.add('comment-element');
    commentLabel.innerText = 'Comment:'

    const commentBtn = document.createElement('button')
    commentBtn.setAttribute('id', 'commentButton')
    commentLabel.classList.add('comment-element')
    commentBtn.innerText = 'Submit'

    const deleteSpecificBtn = document.createElement('button')
    deleteSpecificBtn.setAttribute('id', 'deleteSButton')
    deleteSpecificBtn.classList.add('comment-element')
    deleteSpecificBtn.innerText = 'Search and Delete'

    const searchInput = document.createElement('input')
    searchInput.setAttribute('id', 'searchInput')
    searchInput.classList.add('comment-element')
    searchInput.setAttribute('placeholder', 'Search for comment')

    const commentSpan = document.body.querySelector('#comment-span')
    commentSpan.appendChild(commentLabel)
    commentSpan.appendChild(commentInput)
    commentSpan.appendChild(commentBtn)

    commentSpan.appendChild(searchInput)
    commentSpan.appendChild(deleteSpecificBtn)
    

    commentBtn.addEventListener('click', commentHandler)
    deleteSpecificBtn.addEventListener('click', deleteSCommentHandler)

}

const deleteSCommentHandler = function(event) {
    const commentList = document.getElementById('commentList');
    const searchInput = document.getElementById('searchInput');

    const searchText = searchInput.value.toLowerCase();
    if (searchText.length == 0) {
        alert('Please enter search string to delete by')
    } else {

    const liElements = commentList.querySelectorAll('li');
    liElements.forEach(li => {
        const commentText = li.textContent.toLowerCase();
        const commentWords = commentText.split(' ')
        if (commentWords.includes(searchText)) {
            li.remove();
        }
    });
}


}

const commentHandler = function(event) {
    const val = document.body.querySelector('#commentInput').value
    const li = document.createElement('li')
    li.innerText = val;

    if (val.length == 0) {
        alert('Empty comment, please type something')
    } else {
    const commentList = document.body.querySelector('#commentList')
    commentList.appendChild(li)
    }

}
