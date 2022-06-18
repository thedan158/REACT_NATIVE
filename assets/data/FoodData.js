const foodData = [
  {
    backdrop_path: require('../images/crispy-chicken-burger.jpg'),
    vote_average: 3,
    original_title: 'Burger',
    overview: ' Main course',
    poster_path: require('../images/crispy-chicken-burger.jpg'),
    cost: '5.57',
    cooking_time: '15',
    description:
      'Tasty, delicious, and has me craving more on the first bite.” to “Juicy, mouthwatering, tasty, and everything you’d ever want to savor.',
    id: 1,
  },
  {
    backdrop_path: require('../images/pizza.jpg'),
    vote_average: 5,
    original_title: 'Pizza',
    overview: 'Main course',
    poster_path: require('../images/pizza.jpg'),
    cost: '7.18',
    cooking_time: '45',
    description:
      'Brown the beef better. Lean ground beef I like to use 85% lean angus. Garlic use fresh chopped. Spices chili powder, cumin, onion powder.',
    id: 2,
  },
  {
    backdrop_path: require('../images/sushi.jpg'),
    vote_average: 4.6,
    original_title: 'Sushi',
    overview: 'Main course',
    poster_path: require('../images/sushi.jpg'),
    cost: '9.50',
    cooking_time: '30',
    description:
      'Feel free to eat your sushi rolls or nigiri with your hands, it is also recommended to turn the roll upside-down to dip in soy sauce to avoid absorbing too much into the rice.',
    id: 3,
  },
];
// const foodData = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc`;
// const getImagePath = (path) =>
//   `https://image.tmdb.org/t/p/w440_and_h660_face${path}`;
// const getBackdropPath = (path) =>
//   `https://image.tmdb.org/t/p/w370_and_h556_multi_faces${path}`;

export const getFoods = async () => {
  // const { results } = await fetch(foodData).then((x) => x.json());
  const foods = foodData.map(
    ({
      id,
      original_title,
      poster_path,
      backdrop_path,
      vote_average,
      overview,
      cost,
      description,
      cooking_time,
      // release_date,
      // genre_ids,
    }) => ({
      key: id,
      title: original_title,
      poster: poster_path,
      backdrop: backdrop_path,
      rating: vote_average,
      overview: overview,
      cost: cost,
      description: description,
      time: cooking_time,
      // releaseDate: release_date,
      // genres: genre_ids.map((genre) => genres[genre]),
    })
  );

  return foods;
};
