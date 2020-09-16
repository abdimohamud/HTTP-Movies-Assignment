import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList, setMovieList, movies }) {
  const history = useHistory();
  const [movie, setMovie] = useState(null);
  const params = useParams();

  function handleClick() {
    history.push(`/update-movie/${params.id}`);
  }
  
  const handleDelete = e => {
    e.preventDefault()
    axios
      .delete(`http://localhost:5000/api/movies/${params.id}`)
      .then( res => {
        movies = movies.filter( movie => 
          movie.id !== res.data
        )
        setMovieList(movies)
        history.push('/')

        })
      .catch((err) => console.log(err));
    

  }

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }
  console.log(movie)

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <div className="delete-button"onClick={(e) => { if (window.confirm('Are you sure you wish to delete this item?')) handleDelete(e) } }>
        Delete
      </div>
      <div className="edit-button"onClick={handleClick}>
        Edit
      </div>
    </div>
  );
}

export default Movie;
