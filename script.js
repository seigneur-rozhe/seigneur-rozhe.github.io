async function loadPage(page) {
  // Удаляем класс .active со всех кнопок
  document.querySelectorAll('.nav-button').forEach(button => {
    button.classList.remove('active');
  });

  // Добавляем класс .active к кнопке, соответствующей странице
  let buttonSelector;
  switch (page) {
    case 'learn':
      buttonSelector = '.nav-button a[onclick="loadPage(\'learn\')"]';
      break;
    case 'dictionary':
      buttonSelector = '.nav-button a[onclick="loadPage(\'dictionary\')"]';
      break;
    case 'tests':
      buttonSelector = '.nav-button a[onclick="loadPage(\'tests\')"]';
      break;
    case 'ai-help':
      buttonSelector = '.nav-button a[onclick="loadPage(\'ai-help\')"]';
      break;
    case 'profile':
      buttonSelector = '.nav-button a[onclick="loadPage(\'profile\')"]';
      break;
    default:
      console.error('Unknown page:', page);
      return;
  }
  const activeButton = document.querySelector(buttonSelector).parentElement;
  activeButton.classList.add('active');

  // Загружаем содержимое страницы из папки pages
  try {
    const response = await fetch(`pages/${page}.html`);
    if (!response.ok) {
      throw new Error(`Failed to load page: ${response.status}`);
    }
    const content = await response.text();
    document.getElementById('main-content').innerHTML = content;
  } catch (error) {
    console.error('Error loading page:', error);
    document.getElementById('main-content').innerHTML = `
      <div class="error-message">
        <h2>Ошибка</h2>
        <p>Не удалось загрузить страницу. Пожалуйста, попробуйте позже.</p>
      </div>
    `;
  }
}

// Устанавливаем "Теория" как активную по умолчанию при загрузке
document.addEventListener('DOMContentLoaded', () => {
  loadPage('learn');
});