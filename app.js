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
const findWithIdUrl = 'id/';

const getMovies = (url, searchUrl, options) => {
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
						console.log(item);
						let movieCard = document.createElement('div');
						movieCard.innerHTML = `
							<div class="movie_card">
								<div class="movie_image_container">
									<img src=${item.image_url} alt=${item.title} />
								</div>
								<div class="movie_content">
									<h2>${item.title}</h2>
									<div>
										<p>Rated ${item.content_rating}</p>
										<p>${item.rating}/10</p>
										<p>${item.year}</p>
									</div>
									<div>
										<p>${item.movie_length}minutes</p>
										<a href=${item.trailer} target="_blank">Trailer</a>
									</div>
								</div>
							</div>
					
							`;
						document.body.appendChild(movieCard);
					});
			});
		});
};

// getMovies(baseUrl, topTenPopularMoviesUrl, headers);

const item = {
	title: 'The Shawshank Redemption',
	year: 1994,
	content_rating: 'R',
	description:
		"Chronicles the experiences of a formerly successful banker as a prisoner in the gloomy jailhouse of Shawshank after being found guilty of a crime he did not commit. The film portrays the man's unique way of dealing with his new, torturous life; along the way he befriends a number of fellow prisoners, most notably a wise long-term inmate named Red.",
	movie_length: 120,
	image_url:
		'https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_UX182_CR0,0,182,268_AL_.jpg',
	rating: 9.3,
	title: 'The Shawshank Redemption',
	trailer: 'https://www.youtube.com/embed/NmzuHjWmXOc',
	year: 1994,
};

let movieCard = document.createElement('div');
movieCard.classList.add('flip_card');

movieCard.innerHTML = `
	<div class="card_container">
			<div class="card">
				<div class="card_face front">
					<div class="movie_image_container">
						<img src="${item.image_url}" alt="${item.title}" />
					</div>

					<div class="movie_content">
						<h2>${item.title}</h2>
						<div>
							<p>Rated ${item.content_rating}</p>
							<p>${item.rating}/10</p>
							<p>${item.year}</p>
						</div>
						<div>
							<p>${item.movie_length}minutes</p>
							<a href="${item.trailer}" target="_blank">Trailer</a>
						</div>
					</div>
				</div>
				<div class="card_face back">
					<div>
						<p>${item.description}</p>
					</div>
				</div>
			</div>
		</div>
		`;
document.body.appendChild(movieCard);
