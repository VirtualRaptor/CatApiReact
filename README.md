Aplikacja "CatApiReact" jest aplikacją internetową umożliwiającą użytkownikom przeglądanie obrazów kotów, dodawanie ich do ulubionych oraz zarządzanie ulubionymi obrazami. Składa się z części serwerowej i klienckiej, wykorzystującą różne technologie do zapewnienia pełnej funkcjonalności.

Funkcje aplikacji:
Rejestracja i logowanie użytkowników:

Użytkownicy mogą się rejestrować, tworząc unikalne konta z nazwą użytkownika i hasłem.
Po rejestracji mogą się logować, aby uzyskać dostęp do pełnych funkcji aplikacji.
Przeglądanie obrazów kotów:

Aplikacja pobiera losowe obrazy kotów z API "The Cat API".
Użytkownicy mogą przeglądać obrazy kotów oraz odświeżać je, aby zobaczyć nowe obrazy.
Dodawanie do ulubionych:

Zalogowani użytkownicy mogą dodawać wybrane obrazy kotów do swoich ulubionych.
Ulubione obrazy są zapisywane w bazie danych, przypisane do konkretnego użytkownika.
Zarządzanie ulubionymi:

Użytkownicy mogą przeglądać swoje ulubione obrazy kotów.
Użytkownicy mogą usuwać obrazy z listy ulubionych.
Bezpieczeństwo i autoryzacja:

Aplikacja używa JSON Web Tokens (JWT) do autoryzacji użytkowników.
Middleware weryfikuje tokeny, zapewniając, że tylko zalogowani użytkownicy mogą korzystać z funkcji związanych z ulubionymi.
Technologie:
Backend:

Node.js i Express: Serwer aplikacji, obsługa routingu i middleware.
Mongoose: ORM do zarządzania bazą danych MongoDB.
JSON Web Token (JWT): Autoryzacja użytkowników.
bcryptjs: Hashowanie haseł użytkowników.
Frontend:

React: Tworzenie interfejsu użytkownika.
Axios: Wysyłanie żądań HTTP do API backendu oraz zewnętrznego API "The Cat API".
React Context: Zarządzanie stanem autoryzacji użytkowników.
React Bootstrap i PrimeReact: Stylowanie i komponenty UI.

In the project directory, you can run:

### `npm install`

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `node server/server.js`

Launches the back-end.\


Potential addtitional packages:
### npm install firebase primereact primeicons react-router-dom

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

