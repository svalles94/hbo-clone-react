import { useState, useEffect } from "react";
import axios from 'axios';
import { shuffleArray } from "../../utilities";

const MediaRow = (props) => {
    const [loadingData, setLoadingData] = useState(true);
    const [movies, setMovieData] = useState([]);
    useEffect(() => {
        axios.get(`https://api.themoviedb.org/3/${props.endpoint}&api_key=f7e5193a85a5af98ed826e30d2e8a2c5&language=en-US`)
            .then(function (response) {
                shuffleArray(response.data.results);
                console.log(response.data.results);
                setMovieData(shuffleArray(response.data.results));
                setLoadingData(false);
                // handle success
                console.log('Success Response for ' + props.title );
                console.log(response);
            })
            .catch(function (error) {
                // handle error
                console.log('Errror Response for ' + props.title );
                console.log(error);
            })
            .then(function () {
                // always executed
            });
    }, [])

    const loopComp = (comp, digit) => {
        let thumbnails = [];
        for(let index = 0; index <= digit; index++) {
            thumbnails.push(comp);
        }

        return thumbnails;
    }
    const showThumbnails = () => {
        return loadingData
        ? loopComp(<Skeleton />, 10)
        : movies.map((movie) => {
            return <Thumbnail movieData={movie} />
        });
    };
    return(
     <div className={`media-row ${props.type}`}>
         <h3 className="media-row__title">{props.title}</h3>
         <div className="media-row__thumbnails">
          
            {showThumbnails()}

             
         </div>
   
     </div>
    )
}

const Thumbnail = (props) => {
    return(
        <div className="media-row__thumbnail">
             <img src={`https://image.tmdb.org/t/p/w500/${props.movieData.poster_path}`} alt="" />
             <div className="media-row__top-layer">
                 <i className="fas fa-play" />
             </div>
             </div>
    )
}

const Skeleton = () => {
    return(
        <div className="media-row__thumbnail-skeleton">
             <div className="media-row__thumbnail-skeleton-img"> </div>
             </div>
    )
}

export default MediaRow;