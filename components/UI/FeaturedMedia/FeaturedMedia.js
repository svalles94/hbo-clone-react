import { imageConfigDefault } from "next/dist/server/image-config";
import { useRouter } from "next/router";
import { useStateContext } from "../../HBOProvider";


const FeaturedMedia = (props) => {
  const globalState = useStateContext();
  const router = useRouter();
 
  const clickedPlay = () => {
    router.push(props.linkUrl);
    console.log("send user to media page" + props.mediaUrl);
  };

  const clickedAdd = (props) => {
    globalState.addToList({mediaId: props.mediaId, mediaType: props.mediaType, mediaUrl: props.mediaUrl, imageUrl: props.imageUrl})
    console.log("Clicked to Add Movie ");
  };
  const showMedia = () => {
    if (props.type === "front") {
      return (
        <iframe
          className="featured-media__video"
          width="100%"
          height="100%"
          src={props.mediaUrl}
          allow="accelerometer; autoplay; clipboard-write;
                encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      );
    } else {
      return <img src={props.imageUrl} className="featured-media__img" />;
    }
  };
  return (
    <div
      className={`featured-media ${
        props.type === "single" ? "featured-media--single" : ""
      }`}
    >
      {showMedia()}
      <div className="featured-media__bg">
        <div className="featured-media__container">
          <div className="featured-media__title" onClick={clickedPlay}>
            {props.title}
          </div>
          <div
            className={`featured-media__playing ${
              props.showExtra === "no" ? "hide-comp" : ""
            }`}
          >
            NOW PLAYING
          </div>
          <div
            className={`featured-media__location ${
              props.showExtra === "no" ? "hide-comp" : ""
            }`}
          >
            {props.location}
          </div>
          <div className="featured-media__buttons">
            <div className="featured-media__play-btn" onClick={clickedPlay}>
              <i className="fas fa-play" />
            </div>
            <div
              className={`featured-media__info-btn ${
                props.showExtra === "no" ? "hide-comp" : ""
              }`}
              onClick={() => clickedPlay()}
            >
              More Info
            </div>
            <div
              className={`featured-media__add-btn ${
                props.frontPage === "true" ? "hide-comp" : ""
              }`}
              onClick={() => clickedAdd(props)}
            >
              <i className="fas fa-plus" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedMedia;
