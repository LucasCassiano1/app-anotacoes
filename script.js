const content = document.querySelector('.content');
const btnNew = document.querySelector('.addNote-content');

let items_db = localStorage.getItem('items_db')
  ? JSON.parse(localStorage.getItem('items_db'))
  : [];

const colors = [
  "#8c7eff",
  "#72ffa2",
  "#80cfff",
  "#f2ff78",
  "#ffc978",
  "#ffb2fa",
];

const randomColor = () =>
  colors[Math.floor(Math.random() * colors.length)];

function verifyNulls() {
  items_db = items_db.filter(item => item);
  localStorage.setItem('items_db', JSON.stringify(items_db));
}

function addHTML(item) {
  // cria o container da nota
  const div = document.createElement('div');
  div.innerHTML = `
    <div class="item" style="background-color: ${
      item?.color || randomColor()
    }">
      <span class="remove">✖</span>
      <textarea placeholder="Escreva aqui...">${
        item?.text || ""
      }</textarea>
    </div>
  `;
  content.appendChild(div);
}

function addEvents() {
  const notes = document.querySelectorAll('.item textarea');
  const removes = document.querySelectorAll('.item .remove');

  notes.forEach((textarea, i) => {
    textarea.oninput = () => {
      items_db[i] = {
        text: textarea.value,
        color:
          items_db[i]?.color ||
          textarea.parentElement.style.backgroundColor,
      };
      localStorage.setItem('items_db', JSON.stringify(items_db));
    };
  });

  removes.forEach((btn, i) => {
    btn.onclick = () => {
      // remove do DOM
      content.children[i].remove();
      // remove do array
      if (items_db[i]) {
        items_db.splice(i, 1);
        localStorage.setItem('items_db', JSON.stringify(items_db));
      }
      // reatribui eventos
      addEvents();
    };
  });
}

function loadItems() {
  content.innerHTML = '';
  verifyNulls();
  items_db.forEach(addHTML);
  addEvents();
}

btnNew.onclick = () => {
  addHTML();     // adiciona nota vazia
  addEvents();   // atualiza eventos
};

loadItems();
