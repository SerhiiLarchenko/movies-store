const express = require('express');
const cors = require('cors');
const fs = require('fs');
const parseMovieString = require('./lib/parseMovieString');

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(error.status || 500).send({
    error: error.message
  })
})

const txtPath = `${__dirname}/data/sample_movies.txt`;
const jsonPath = `${__dirname}/data/movies.json`;

app.get('/movies', (req, res, next) => {

  fs.readFile(jsonPath, (error, data)=> {
    if (error) next(error);
    else {
      let json = JSON.parse(data.toString());
      if (json.ready) res.end(JSON.stringify(json.movies));
      else {
        fs.readFile(txtPath, (error, data) => {
          if (error) next(error);
          else {
            let movies = parseMovieString(data);
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

app.post('/movies', ( req, res, next ) => {

  const movies = req.body;
  const data = { movies: movies, ready: true };

  fs.writeFile(jsonPath, JSON.stringify(data), error => {
    if (error) {
      res.end('Internal server error. Server cannot save your list');
      next(error);
    } else res.end('server saved your list');
  });

});

app.post('/addmovie', ( req, res, next ) => {
  fs.readFile(jsonPath, (error, data) => {
    if (error) next(error);
    else {
      let json = JSON.parse(data.toString());
      json.movies.push(req.body);
      fs.writeFile(jsonPath, JSON.stringify(json), error => {
        if (error) {
          res.end('Internal server error. Server cannot add your movie');
          next(error);
        } else res.end('server saved your list');
      })
    }
  });
});

app.delete('/deletemovie', (req, res, next) => {
  fs.readFile(jsonPath, (error, data) => {
    if (error) next(error);
    else {
      let json = JSON.parse(data.toString());
      json.movies = json.movies.filter(movie => 
        movie.id !== req.body.id)
      fs.writeFile(jsonPath, JSON.stringify(json), error => {
        if (error) {
          res.end('Internal server error. Server cannot delete movie');
          next(error);
        } else res.end('movie is deleted');
      })
    }
  });
})

app.listen(port, () => 
  console.log(`Listening on port:${port}`)
);