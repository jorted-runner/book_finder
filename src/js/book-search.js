const submitBtn = document.querySelector('#submit');

submitBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const authorInput = document.querySelector('#author');
    const titleInput = document.querySelector('#title');
    const genreInput = document.querySelector('#genre');
    fetchBooks(authorInput.value, titleInput.value, genreInput.value)
});

async function fetchBooks(author, title, genre) {
    let url = `https://openlibrary.org/search.json?`;

    // Build the URL with non-empty parameters
    if (author) url += `author=${encodeURIComponent(author)}&`;
    if (title) url += `title=${encodeURIComponent(title)}&`;
    if (genre) url += `subject=${encodeURIComponent(genre)}&`;

    // Remove the trailing '&' or '?' if no parameters were added
    url = url.slice(-1) === '&' || url.slice(-1) === '?' ? url.slice(0, -1) : url;

    const headers = new Headers({
        "User-Agent": "BetterBookBureau/1.0 (dee5cinco@gmail.com)"
    });
    const options = {
        method: 'GET',
        headers: headers
    };

    try {
        const response = await fetch(`${url}&limit=10`, options);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        displayResults(data.docs);
    } catch (error) {
        console.error('Error:', error);
    }
}

async function getCover(id) {
    // URL for the medium-sized cover image
    const url = `https://covers.openlibrary.org/b/id/${id}-M.jpg`;

    // Headers are not necessary for fetching images, so we can omit them
    const options = {
        method: 'GET'
    };

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return url;
    } catch (error) {
        console.error('Error:', error);
    }
}


async function displayResults(result) {
    console.log(result);
    const resultsDiv = document.querySelector('.results');
    resultsDiv.innerHTML = '';

    for (const book of result) {
        const bookDiv = document.createElement('div');
        const titleH1 = document.createElement('h1');
        titleH1.textContent = book.title;
        const authorH3 = document.createElement('h3');
        authorH3.textContent = book.author_name ? book.author_name.join(', ') : 'Unknown Author';

        const coverIMG = document.createElement('img');
        if (book.cover_i) {
            coverIMG.src = await getCover(book.cover_i);
        } else {
            coverIMG.alt = 'No cover available';
        }

        bookDiv.appendChild(titleH1);
        bookDiv.appendChild(authorH3);
        bookDiv.appendChild(coverIMG);
        resultsDiv.appendChild(bookDiv);
    }
}