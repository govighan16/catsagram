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
