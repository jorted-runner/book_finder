const submitBtn = document.querySelector('#submit');

submitBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const authorInput = document.querySelector('#author');
    const titleInput = document.querySelector('#title');
    const genreInput = document.querySelector('#genre');
    fetchBooks(authorInput.value, titleInput.value, genreInput.value)
});

async function fetchBooks(author, title, genre) {
    const searchString = `${author} ${title} ${genre}`
    const url = `https://goodreads-books.p.rapidapi.com/search?q=${searchString}&page=1`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '630f9dc8efmsh5debe09cd0afe06p162db7jsn5d6f722a2171',
            'x-rapidapi-host': 'goodreads-books.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
        displayResults(result);
    } catch (error) {
        console.error(error);
    }
}

function displayResults(result) {
    const resultsDiv = document.querySelector('.results');
    result.forEach((book) => {
        const bookDiv = document.createElement('div');
        const titleH1 = document.createElement('h1');
        titleH1.textContent = book.title;
        const authorH3 = document.createElement('h3');
        authorH3.textContent = book.author;
        const coverIMG = document.createElement('img');
        coverIMG.setAttribute('src', book.smallImageURL);
        bookDiv.appendChild(titleH1);
        bookDiv.appendChild(authorH3);
        bookDiv.appendChild(coverIMG);
        resultsDiv.appendChild(bookDiv);
    });
}