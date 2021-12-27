import Head from "next/head";
import MainLayout from "../../components/Layouts/MainLayout";
import CastInfo from "../../components/UI/CastInfo/CastInfo";
import FeaturedMedia from "../../components/UI/FeaturedMedia/FeaturedMedia";
import MediaRow from "../../components/UI/MediaRow/MediaRow";
import AuthCheck from "../../components/AuthCheck";
import { useRouter } from "next/router";
import axios from "axios";
import { useEffect, useState } from "react";

export default function SingleMediaPage(props) {
  const router = useRouter();
  const [mediaData, setMediaData] = useState(false);
  const [videoKey, setVideoKey] = useState([]);
  const [hasVideo, setHasVideo] = useState(false);
  // const { id } = router.query;
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${props.query.id}?api_key=f7e5193a85a5af98ed826e30d2e8a2c5&language=en-US&append_to_response=videos`
      )
      .then(function (response) {
        setMediaData(response.data);
        if (response.data.videos.results.length <= 0) {
          setHasVideo(false);
          console.log("this movie doesent have a video file");
        } else {
          setHasVideo(true);
          setVideoKey(response.data.videos.results);
        }

      })
      .catch(function (error) {
        // handle error
        console.log("Errror Response: ");
        console.log(error);
        router.push('/');
      })
      .then(function () {

        // always executed
      });
  }, []);

  const mediaUrl = () => {
    if (hasVideo === true) {
    const videoResults = Object.values(videoKey).filter(video => video.type == "Trailer").slice(0, 1);
    const chosenVideoKey = videoResults.map(a => a.key)[0];
    const website = videoResults.map(a => a.site)[0];
    console.log("///////////////////");
    console.log(videoResults.map(a => a.site)[0]);
    console.log(chosenVideoKey);
    if (website == "YouTube"){
      return `https://www.youtube.com/embed/${chosenVideoKey}?mute=1&autoplay=1&loop=1&playlist=${chosenVideoKey}`;
    } else {
      return `https://player.vimeo.com/video/${chosenVideoKey}?autoplay=1&loop=1&muted=1&background=1`
    }
    }
  }

  const imageUrl = () => {
    if (hasVideo == false) {
      return `https://image.tmdb.org/t/p/w1280${mediaData.poster_path}`
    } else {
      return
    }
  }

  return AuthCheck(
    <MainLayout>
      <FeaturedMedia
        type={hasVideo ? 'front' : '' }
        imageUrl={hasVideo === false ? imageUrl() : ''}
        mediaUrl={hasVideo ? mediaUrl() : ''}
        title={mediaData.title}
        location="In theaters and on HBO MAX. Streaming throughout May 23."
        linkUrl="/movies/id"
      />
      {/* <MediaRow title="More Like This" type="small-v"/> */}
      <CastInfo />
    </MainLayout>
  );
}

export async function getServerSideProps(context) {
  return {
    props: { query: context.query },
  };
}
