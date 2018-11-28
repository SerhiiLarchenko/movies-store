const express = require('express');
const cors = require('cors');
const fs = require('fs');

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

app.get('/movies', (req, res, next) => {

  const txtPath = `${__dirname}/data/sample_movies.txt`;
  const jsonPath = `${__dirname}/data/movies.json`;

  fs.readFile(txtPath, (error, data) => {
    if (error) next(error);
    else if (data) {
      let movies = data.toString().trim().split('\n\n').map(string => {
        let movie = {};
        string.split('\n').forEach(feature => {
          let limit = feature.indexOf(':');
          movie[feature.slice(0,limit)] = feature.slice(limit+2);
        });
        movie.Stars = movie.Stars.split(', ');
        return movie;
      });

      fs.writeFile(jsonPath, JSON.stringify(movies), error => {
        if (error) next(error);
        else res.sendFile(jsonPath, error => {
          if (error) next(error);
          else console.log('movies are sent');
        });
      });
    }
  });
});

app.listen(port, () => 
	console.log(`Listening on port:${port}`)
);