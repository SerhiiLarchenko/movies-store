function parseMovieString (data) {
  return data.toString().trim().split('\n\n').map(string => {
    let movie = {};
    string.split('\n').forEach(feature => {
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