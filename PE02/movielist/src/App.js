import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [movies, setMovies] = useState([
    { id: 1, title: "The Shawshank Redemption", genre: "Drama", year: 1994 },
    { id: 2, title: "The Godfather", genre: "Crime", year: 1972 },
    { id: 3, title: "The Dark Knight", genre: "Action", year: 2008 },
    { id: 4, title: "12 Angry Men", genre: "Drama", year: 1957 },
    { id: 5, title: "Schindler's List", genre: "Biography", year: 1993 }
  ]);

  const [filteredMovies, setFilteredMovies] = useState(movies);

  const uniqueGenres = [...new Set(movies.map(movie => movie.genre))];
  const [selectedGenre, setSelectedGenre] = useState("All Genres");

  useEffect(() => {
    if (selectedGenre === "All Genres") {
      setFilteredMovies(movies);
    } else {
      const filteredMoviesNew = movies.filter(movie =>
        movie.genre.toLowerCase() === selectedGenre.toLowerCase()
      );
      setFilteredMovies(filteredMoviesNew);
    }
  }, [selectedGenre]);

  const handleGenreChange = (genre) => {
    setSelectedGenre(genre);
  };

  const handleMovieClick = (movie) => {
    alert(`You have clicked on: ${movie.title}`);
  };

  return (
    <div>
      <h1>Movies List</h1>

      <select onChange={(e) => handleGenreChange(e.target.value)}>
        {uniqueGenres.map((genre, index) => (
          <option key={index} value={genre}>
            {genre}
          </option>
        ))}
        <option value="All Genres">All Genres</option>
      </select>

      <ul>
        {filteredMovies.map(movie => (
          <li key={movie.id}>
            <h2 onClick={() => handleMovieClick(movie)}>{movie.title}</h2>
            <p>Genre: {movie.genre}</p>
            <p>Release Year: {movie.year}</p>
          </li>
        ))}
      </ul>

    </div>
  );
}

export default App;
