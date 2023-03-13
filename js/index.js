const wrapper = document.querySelector('.results');
const formEl = document.querySelector('form');
const inputEl = document.querySelector('input');
const searchButtonEl = document.querySelector('button');
const error = document.querySelector('.repo-error');

//отрисовка в случае если нет результатов
const renderNoResults = () => {
  const element = document.createElement('div');
  element.classList.add('repo');
  element.innerHTML = `    
    <p class="search-text"><span></span> No results =( </p>
  `;
  wrapper.append(element);
}

//проверка на наличие результата, если есть данные - рисуем карточки,
//если нет - то рисуем: Нет результатов.
const renderCards = (data) => {
  wrapper.innerHTML = ''
  console.log(data)
  if (!data.length == 0) {
    data.forEach((item) => {
      const element = document.createElement('div');
      element.classList.add('repo');
      element.innerHTML = `
    <p class="search-text"><span>Repo: 
    <a class="link" href="${item.html_url}" target="_blank">${item.name}</a> 
     </span>
    </p>
    <p class="search-text"><span>Forks: </span>${item.forks_count}</p>
    <p class="search-text"><span>Description: </span>${item.description}</p>
  `;
      wrapper.append(element);
    })
  } else {
    renderNoResults();
  }
}

//запрос к серверу.
formEl.addEventListener('submit', async (e) => {
  e.preventDefault();
  const inputsValue = Object.fromEntries(new FormData(e.target));
  const response = await fetch(`
    https://api.github.com/search/repositories?q=${inputsValue.repo}
  `);

  if (response.ok) {
    const data = await response.json();
    renderCards(data.items.splice(0, 10));
    inputEl.value = '';
  } else {
    console.log('No results');
  }
});

formEl.addEventListener('input', () => {
  if (inputEl.value.length < 2) {
    searchButtonEl.disabled = true;
    error.style.display = "block";
  } else {
    searchButtonEl.disabled = false;
    error.style.display = "none";
  }
});

