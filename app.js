const headers = {
	method: 'GET',
	headers: {
		'x-rapidapi-host': 'data-imdb1.p.rapidapi.com',
	},
};

const baseUrl = 'https://data-imdb1.p.rapidapi.com/movie/';

const topTenPopularMoviesUrl = 'order/byRating/?page_size=2';
const topTenRomanceMoviesUrl = 'byGen/Romance/?page_size=2&page=1';
const topTenActionMoviesUrl = 'byGen/Action/?page_size=2&page=1';
const topTenComedyMoviesUrl = 'byGen/Comedy/?page_size=10&page=1';
const topTenHorrorMoviesUrl = 'byGen/Horror/?page_size=10&page=1';

const getMovies = (url, searchUrl, options) => {
	fetch(url + searchUrl, options)
		.then((response) => {
			return response.json();
		})
		.then((data) => {
			let movieArray = data.results;
			movieArray.forEach((item) => console.log(item.title));
			return data.results;
		});
};

getMovies(baseUrl, topTenPopularMoviesUrl, headers);
getMovies(baseUrl, topTenRomanceMoviesUrl, headers);
