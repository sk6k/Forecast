// const fetchUsersBtn = document.querySelector(".btn");
// const userList = document.querySelector(".user-list");

// fetchUsersBtn.addEventListener("click", () => {
// 	fetchUsers() // виклик ф-ї, яка повертає проміс у стані пендінг
// 		.then((users) => renderUserList(users)) // виклик ф-ї у яка рендерить розмітку
// 		.catch((error) => console.log(error));
// });

// function fetchUsers() {
// 	return fetch(
// 		// метод фетч, побудований на промісах, повертає проміс
// 		"https://jsonplaceholder.typicode.com/users?_limit=7&_sort=name" // запит на АПІ
// 	).then((response) => {
// 		if (!response.ok) {
// 			throw new Error(response.status); // Перевірка і створення явної помилки
// 		}
// 		return response.json(); // парсинг данних в форматі JSON
// 	});
// }

// function renderUserList(users) {
// 	const markup = users
// 		.map((user) => {
// 			return `
//           <li>
//             <p><b>Name</b>: ${user.name}</p>
//             <p><b>Email</b>: ${user.email}</p>
//             <p><b>Company</b>: ${user.company.name}</p>
//           </li>
//       `;
// 		})
// 		.join("");
// 	userList.innerHTML = markup;
// }

// const response = fetch(
// 	"http://api.weatherapi.com/v1/forecast.json?key=3f3e75d6e5b54bf7a9d103959230403&q=Kiev&days=5"
// );
// response.then((resp) => resp.json()).then((data) => console.log(data));

const form = document.querySelector(".js-search");
form.addEventListener("submit", onSearch);
const list = document.querySelector(".js-list");

const errorRequest =
	"https://timeweb.com/ru/community/article/a0/a0454be985801c2f9a12d2d5aedddd78.jpg";
const emptyRequest =
	"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRg6SgvpI92oAlISPL-h9cukWe37StFTQNg4w&usqp=CAU";

function onSearch(evt) {
	evt.preventDefault();
	const { query, days } = evt.currentTarget.elements;
	if (query.value) {
		weatherApi(query.value, days.value)
			.then((data) => createMarkup(data))
			.catch((err) => createErrorMessage(err, errorRequest));
	} else {
		createErrorMessage("Empty search value", emptyRequest);
	}
}

function weatherApi(city, days) {
	const BASE_URL = "http://api.weatherapi.com/v1";
	const key = "3f3e75d6e5b54bf7a9d103959230403";
	return fetch(
		`${BASE_URL}/forecast.json?key=${key}&q=${city}&days=${days}`
	).then((resp) => {
		if (!resp.ok) {
			throw new Error(resp.statusText);
		}
		return resp.json();
	});
}

function createMarkup({ forecast: { forecastday: arr } }) {
	const markup = arr.map(
		({
			date,
			day: {
				avgtemp_c: avg,
				condition: { text, icon },
			},
		}) => `<li>
                <img src="${icon}" alt="${text}">
                <h2>Дата:${date}</h2>
                <h3>Температура:${avg}</h3>
                <span>${text}</span>
            </li>`
	);

	list.innerHTML = markup.join("");
}

function createErrorMessage(err, img) {
	const markup = `<li>
    <h2>${err}</h2>
    <img src="${img}" alt="${err}" width="400">
    </li>`;
	list.innerHTML = markup;
}
