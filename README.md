<h1>App for search movies from MovieDB API </h1>

<h2><a href='https://rosstiks.github.io/movies-library-app/'>Ссылка</a> на Pages</h2>
<h2><a href='https://movies-library-app.vercel.app/'>Ссылка</a> на Vercel</h2>

<h2>Для сборки:</h2>
<h3>npm start</h3>
лайв сервер (development mode)
<h3>npm buld</h3>
сборка проекта (production mode)
<h3>npm lint / npm lint:fix</h3>
проверка/фикс ESLint(airbnb config)
<h3>npm format</h3>
форматирование prettier
<h3>npm deploy</h3>
деплой на GitHub в ветку 'gh-pages'

<h2>v.2.2.14</h2>
<h3>Changes:</h3>
<ol>
  <li><b>Add:</b> Добавлена вкладка Rated(гостевая сессия)</li>
  <li><b>Add:</b> Добавлено создание гостевой сессии при запуске приложения</li>
  <li><b>Fix:</b> Список жанров получается при запуске приложения и вынесен в контекст</li>
  <li><b>Fix:</b> Цветовая градация рейтинга</li>
</ol>

<h2>v.2.2.7</h2>
<h3>Changes:</h3>
<ol>
  <li><b>Add:</b> Добавлен автоматический поиск при вводе текста в поисковую строку (debounce 400ms)</li>
  <li><b>Add:</b> Добавлено сообщение при отсутствии результатов поиска по ключевому слову</li>
  <li><b>Add:</b> Добавлена пагинация (переключение страниц через повторный запрос к серверу) </li>
  <li><b>Fix:</b> Исправлена ошибка при отсутствии поля 'date' в ответе сервера</li>
  <li><b>Fix:</b> Добавлена дефолтная картинка при отсутствии постера в ответе сервера</li>
</ol>

<h2>v.2.1.14</h2>
<h3>Changes:</h3>
<ol>
  <li><b>Add:</b> Добавлен индикатор загрузки</li>
  <li><b>Add:</b> Добавлено сообщение при ошибке запроса </li>
  <li><b>Fix:</b> Логика формирования записи в data App вынесена на сторону сервиса API</li>
</ol>

<h2>v.2.1.9</h2>
<h3>Changes:</h3>
<ol>
  <li><b>Add:</b> Статическое приложение - получаем первую страницу поиска по статичному ключевому слову</li>
  <li><b>Add:</b> Адаптивный интерфейс</li>
  <li><b>Add:</b> Обрезка текста описания в зависимости от размера контейнера (только при рендере элемента, при ресайзе не работает)</li>
  <li><b>Add:</b> Для валидности кода используется Eslint(config airbnb), prettier</li>
</ol>
