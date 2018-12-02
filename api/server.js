const express = require('express');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(error.status || 500).send({
    error: error.message
  })
})

app.get('/movies', (req, res, next) => {

  const txtPath = `${__dirname}/data/sample_movies.txt`;
  const jsonPath = `${__dirname}/data/movies.json`;

  fs.readFile(jsonPath, (error, data)=> {
    if (error) next(error);
    else {
      let json = JSON.parse(data.toString());
      if (json.ready) res.end(JSON.stringify(json.movies));
      else {
        fs.readFile(txtPath, (error, data) => {
          if (error) next(error);
          else {
            let movies = data.toString().trim().split('\n\n').map(string => {
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

            res.end(JSON.stringify(movies));
            json.movies = movies;
            json.ready = true;

            fs.writeFile(jsonPath, JSON.stringify(json), 
              error => next(error));
          }
        })
      }
    }
  })
});

app.listen(port, () => 
  console.log(`Listening on port:${port}`)
);