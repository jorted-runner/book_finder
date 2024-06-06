document.addEventListener('DOMContentLoaded', function() {
    let tbr_books = JSON.parse(localStorage.getItem('tbr_books')) || [];
    displayResults(tbr_books);
})

async function displayResults(data) {
    const contentsDiv = document.querySelector('.content');
    contentsDiv.innerHTML = '';

    for (const book of data) {
        const bookDiv = document.createElement('div');
        bookDiv.classList.add('book_card');

        const titleDiv = document.createElement('div');
        titleDiv.classList.add('title');

        const titleH1 = document.createElement('h1');
        titleH1.textContent = book['book']['title'];

        const authorH3 = document.createElement('h3');
        authorH3.textContent = book['book']['author'];

        const coverIMG = document.createElement('img');
        coverIMG.src = book['book']['cover_url'];

        titleDiv.appendChild(titleH1);
        titleDiv.appendChild(authorH3);

        bookDiv.appendChild(titleDiv);
        bookDiv.appendChild(coverIMG);

        contentsDiv.appendChild(bookDiv);
    }
}