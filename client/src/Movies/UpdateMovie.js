import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'

const initialValues = {
    title:'',
    director: '',
    metascore: 0,
    stars: []

}

const UpdateMovie = ({setMovieList, movies}) => {
    const [values , setValues] = useState(initialValues)
    const history = useHistory();
    const {id} = useParams();
    console.log(values.star)
    useEffect(() => {
        axios
          .get(`http://localhost:5000/api/movies/${id}`)
          .then((res) => setValues(res.data) )
          .catch((err) =>
            console.error("bk: UpdateForm.js: itemById failed: err: ", err.message)
          );
      }, [id]);
    

    // const handleChanges = (event) => {
    //     setValues({...values,[event.target.name] : event.target.value });
    //   };
    const handleChanges = (e) => {
        e.persist();
        let value = e.target.value;
        if (e.target.name === "stars") {
          value = value.split(",");
        }
        
    
        setValues({
          ...values,
          [e.target.name]: value,
        });
      };
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:5000/api/movies/${id}`, values)
        .then((res)=> {
            setValues(res.data);
            setMovieList(movies.map(movie =>{
                if(movie.id== id){
                    return values
                } else{
                    return movie
                }
            }))
            history.push(`/movies/${id}`);
        }); 
    };

    return(
        <div className="update">
            <h2>Update A Movie</h2>
            <div className="form">
                <form onSubmit={handleSubmit}>
                    <input type="text" name="title" value={values.title} onChange={handleChanges} placeholder="Title"  />
                    <input type="text" name ="director" value={values.director} onChange={handleChanges} placeholder="Director"  />
                    <input type="number" name ="metascore" value={values.metascore} onChange={handleChanges} placeholder="MetaScore"  />
                    <input type="stars" name ="stars" value={values.stars} onChange={handleChanges} placeholder=""  />
                    <button>UPDATE</button> 
                </form>
                
            </div>
            

        </div>
    )
}
export default UpdateMovie;