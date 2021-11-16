#App for search movies from MovieDB API 

##[Ссылка](#) на Pages

##Для сборки:
####`npm start` - лайв сервер (development mode)
####`npm buld` - сборка проекта (production mode)
####`npm lint`/`npm lint:fix` - проверка/фикс ESLint(airbnb config)
####`npm format` - форматирование prettier
####`npm deploy` - деплой на GitHub в ветку 'gh-pages' (husky+, lint-staged+)

##v.2.1.9
###Changes:
1. Add: Статическое приложение - получаем первую страницу поиска по статичному ключевому слову
2. Add: Для валидности кода используется Eslint(config airbnb), prettier
3. Add: Адаптивный интерфейс
4. Add: Обрезка текста описания в зависимости от размера контейнера (только при рендере элемента, при ресайзе не работает)