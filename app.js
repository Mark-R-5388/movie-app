const headers = {
	method: 'GET',
	headers: {
		'x-rapidapi-host': 'data-imdb1.p.rapidapi.com',
		'x-rapidapi-key': 'KEY',
	},
};

const baseUrl = 'https://data-imdb1.p.rapidapi.com/movie/';
const topTenPopularMoviesUrl = 'order/byRating/?page_size=10';
const topTenRomanceMoviesUrl = 'byGen/Romance/?page_size=10&page=1';
const topTenActionMoviesUrl = 'byGen/Action/?page_size=10&page=1';
const topTenComedyMoviesUrl = 'byGen/Comedy/?page_size=10&page=1';
const topTenHorrorMoviesUrl = 'byGen/Horror/?page_size=10&page=1';
const findWithIdUrl = 'id/';

// movie containers
const topTenMoviesSection = document.querySelector('.top_ten_movies_section');
const topTenActionMoviesSection = document.querySelector(
	'.top_action_movies_section'
);
const topTenComedyMoviesSection = document.querySelector(
	'.top_commedy_movies_section'
);
const topTenRomanceMoviesSection = document.querySelector(
	'.top_romance_movies_section'
);
const topTenHorrorMoviesSection = document.querySelector(
	'.top_horror_movies_section'
);

const getMovies = (url, searchUrl, options, section) => {
	fetch(url + searchUrl, options)
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			let movieArray = data.results;

			movieArray.forEach((item) => {
				fetch(baseUrl + findWithIdUrl + item.imdb_id + '/', headers)
					.then((response) => {
						return response.json();
					})
					.then((data) => {
						let item = data.results;
						createCard(item, section);
					});
			});
		});
};

const createCard = (item, container) => {
	let movieCard = document.createElement('div');
	movieCard.classList.add('card_container');

	movieCard.innerHTML = `
			<div class="card">
				<div class="card_face front">
					<div class="movie_image_container">
						<img class="movie_image" src="${item.image_url}" alt="${item.title}" />
					</div>

					<div class="movie_content">
						<h3>${item.title}</h3>
						<div class="movie_content_row_1">
							<p>Rated ${item.content_rating}</p>
							<p>${item.rating}/10</p>
							<p>${item.year}</p>
						</div>
						<div class="movie_content_row_2">
							<p>${item.movie_length} minutes</p>
							<a href="${item.trailer}" target="_blank">Trailer</a>
						</div>
					</div>
				</div>
				<div class="card_face back">
					<div class="back_content_container">
					<p>${item.description}</p>
					</div>
					
				</div>
			</div>
		`;
	container.append(movieCard);
};

getMovies(baseUrl, topTenPopularMoviesUrl, headers, topTenMoviesSection);
getMovies(baseUrl, topTenActionMoviesUrl, headers, topTenActionMoviesSection);
getMovies(baseUrl, topTenComedyMoviesUrl, headers, topTenComedyMoviesSection);
getMovies(baseUrl, topTenRomanceMoviesUrl, headers, topTenRomanceMoviesSection);
getMovies(baseUrl, topTenHorrorMoviesUrl, headers, topTenHorrorMoviesSection);
