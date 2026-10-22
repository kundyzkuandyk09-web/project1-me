const cards = document.querySelector('.cards');
const addBtn = document.querySelector('.addBtn');
const popup = document.querySelector('.popup');
const form = document.querySelector('.popup form');
const cancelBtn = document.querySelector('.cancelBtn');

let books = [];

function escapeHTML(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function render() {
  cards.innerHTML = '';

  books.forEach((book) => {
    const cardp = document.createElement('div');
    cardp.className = 'card';

    cardp.innerHTML = `
      <p class="title">Title: ${escapeHTML(book.title)}</p>
      <p class="author">Author: ${escapeHTML(book.author)}</p>
      <p class="pages">Pages: ${book.pages}</p>
      <button class="toggleBtn">${book.read ? 'Read' : 'Not read'}</button>
      <button class="deleteBtn">Delete</button>
    `;

    cardp.querySelector('.toggleBtn').addEventListener('click', () => {
      book.read = !book.read;
      render();
    });

    cardp.querySelector('.deleteBtn').addEventListener('click', () => {
      books = books.filter((b) => b !== book);
      render();
    });

    cards.appendChild(cardp);
  });
}

function closePopup() {
  popup.classList.remove('open');
  form.reset();
}

addBtn.addEventListener('click', () => {
  popup.classList.add('open');
  form.querySelector('input[name="title"]').focus();
});

cancelBtn.addEventListener('click', closePopup);

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const data = new FormData(form);

  books.push({
    id: crypto.randomUUID(),
    title: data.get('title').trim(),
    author: data.get('author').trim(),
    pages: Number(data.get('pages')),
    read: data.get('read') === 'on',
  });

  closePopup();
  render();
});

async function loadBooks() {
  const response = await fetch('data.json');
  books = await response.json();
  render();
}

loadBooks();