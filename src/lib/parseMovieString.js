function parseMovieString (data) {

  return data.toString().trim().split('\nTitle:').map((string,i) => {
    if (i !== 0) string = 'Title:' + string;
    let movie = {};
    string.split('\n').forEach( (feature, i) => {
      let limit = feature.indexOf(':');
      movie[feature.slice(0,limit).toLowerCase()] = 
      feature.slice(limit+1).trim();
    });
    movie.stars = movie.stars.split(', ');
    movie.id = movie['release year']*Math.random();
    return movie;
  });
}

export default parseMovieString;