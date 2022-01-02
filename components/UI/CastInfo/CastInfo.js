import { useState, useEffect } from "react";
import axios from "axios";


const CastInfo = (props) => {
  const [loadingData, setLoadingData] = useState(true);
  const [credits, setCredits] = useState(false);
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${props.mediaId}/credits?api_key=f7e5193a85a5af98ed826e30d2e8a2c5&language=en-US`
      )
      .then(function (response) {
        // console.log(response.data.results);
        setCredits(response.data);
        setLoadingData(false);
        // handle success
        console.log("Success Response for cast and crew.");
        console.log(response);
        console.log(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log("Errror Response for cast and crew." );
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }, []);
  const showCast = () => {
    if(loadingData !== true){
      return credits.cast.map((item, index) => {
        return(
          <ul className="cast-info__crew" key={index}>
            <li>
              {item.character}
            </li>
            <li>
              {item.name}
            </li>
          </ul>
        )
      })
    } else {
      return(<div>Loading Cast</div>)
    }
  }

  const showCrew = () => {
    if(loadingData !== true){
      return credits.crew.map((item, index) => {
        return(
          <ul className="cast-info__crew" key={index}>
            <li>
              {item.job}
            </li>
            <li>
              {item.name}
            </li>
          </ul>
        )
      })
    } else {
      return(<div>Loading Crew</div>)
    }
  }

  return (
    <div className="cast-info">
      <div className="cast-info__group-title">Cast</div>
      <div className="cast-info__list">
        {showCast()}

      </div>
      <div className="cast-info__group-title">Crew</div>
      <div className="cast-info__list">
        {showCrew()}

      </div>
    </div>
  );
};

export default CastInfo;




// const MediaRow = (props) => {
  

//   const loopComp = (comp, digit) => {
//     let thumbnails = [];
//     for (let index = 0; index <= digit; index++) {
//       thumbnails.push(comp);
//     }

//     return thumbnails;
//   };
//   const showThumbnails = (type) => {
//     return loadingData
//       ? loopComp(<Skeleton />, 10)
//       : movies.map((movie) => {
//           return <Thumbnail movieData={movie} type={type} />;
//         });
//   };

//   return (
//     <div className={`media-row ${props.type}`}>
//       <h3 className="media-row__title">{props.title}</h3>
//       <div className="media-row__thumbnails">{showThumbnails(props.type)}</div>
//     </div>
//   );
// };

// const Thumbnail = (props) => {
//   const thumbSize = (type) => {
//     if (props.type === "large-v") {
//       return "400";
//     }
//     if (props.type === "small-v") {
//       return "185";
//     }
//     if (props.type === "large-h") {
//       return "500";
//     }
//     if (props.type === "small-h") {
//       return "342";
//     }
//   };
//   return (
//     <Link href={`/movie/${props.movieData.id}`}>
//       <a>
//         <div className="media-row__thumbnail">
//           <img
//             src={`https://image.tmdb.org/t/p/w${thumbSize(props.type)}/${
//               props.movieData.poster_path
//             }`}
//             alt=""
//           />
//           <div className="media-row__top-layer">
//             <i className="fas fa-play" />
//           </div>
//         </div>
//       </a>
//     </Link>
//   );
// };

// const Skeleton = () => {
//   return (
//     <div className="media-row__thumbnail-skeleton">
//       <div className="media-row__thumbnail-skeleton-img"> </div>
//     </div>
//   );
// };

