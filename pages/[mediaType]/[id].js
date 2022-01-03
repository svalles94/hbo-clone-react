import Head from "next/head";
import MainLayout from "../../components/Layouts/MainLayout";
import CastInfo from "../../components/UI/CastInfo/CastInfo";
import FeaturedMedia from "../../components/UI/FeaturedMedia/FeaturedMedia";
import MediaRow from "../../components/UI/MediaRow/MediaRow";
import AuthCheck from "../../components/AuthCheck";
import { useRouter } from "next/router";
import axios from "axios";
import { useEffect, useState } from "react";
import LazyLoad from "react-lazyload";
import PlaceHolders from "../../components/UI/Placeholder/PlaceHolders";

export default function SingleMediaPage(props) {
  const router = useRouter();
  const { id } = router.query;
  // useEffect(() => {
  //   axios
  //     .get(
  //       `https://api.themoviedb.org/3/movie/${props.query.id}?api_key=f7e5193a85a5af98ed826e30d2e8a2c5&language=en-US&append_to_response=videos`
  //     )
  //     .then(function (response) {
  //       setMediaData(response.data);
  // if (response.data.videos.results.length <= 0) {
  //   setHasVideo(false);
  //   console.log("this movie doesent have a video file");
  // } else {
  //   setHasVideo(true);
  //   setVideoKey(response.data.videos.results);
  // }
  //     })
  //     .catch(function (error) {
  //       // handle error
  //       console.log("Errror Response: ");
  //       console.log(error);
  //       router.push("/");
  //     })
  //     .then(function () {
  //       // always executed
  //     });
  // }, [mediaData]);

  const mediaUrl = () => {
    if (props.hasVideo === true) {
      const videoResults = Object.values(props.mediaData.videos.results)
        .filter((video) => video.type == "Trailer")
        .slice(0, 1);
      const chosenVideoKey = videoResults.map((a) => a.key)[0];
      const website = videoResults.map((a) => a.site)[0];
      console.log("///////////////////");
      if (website == "YouTube") {
        return `https://www.youtube.com/embed/${chosenVideoKey}?mute=1&autoplay=1&loop=1&playlist=${chosenVideoKey}`;
      } else {
        return `https://player.vimeo.com/video/${chosenVideoKey}?autoplay=1&loop=1&muted=1&background=1`;
      }
    }
  };

  const imageUrl = () => {
    if (props.hasVideo == false) {
      const posterPath = props.mediaData.poster_path;
      const backDropPath = props.mediaData.backdrop_path;
      if (backDropPath == null) {
        return `https://image.tmdb.org/t/p/w1280${posterPath}`;
      } else {
        return `https://image.tmdb.org/t/p/w1280${backDropPath}`;
      }
    } else {
      return;
    }
  };

  return AuthCheck(
    <MainLayout>
      <FeaturedMedia
        showExtra="no"
        type={props.hasVideo ? "front" : ""}
        imageUrl={props.query.mediaType === "movie" ? imageUrl() : imageUrl()}
        mediaUrl={props.query.mediaType === "movie" ? mediaUrl() : mediaUrl()}
        title={
          props.query.mediaType === "movie"
            ? props.mediaData.title
            : props.mediaData.name
        }
        location="In theaters and on HBO MAX. Streaming throughout May 23."
        linkUrl="/movies/id"
      />
      <LazyLoad
        offset={-400}
        placeholder={<PlaceHolders title="Popular Movies" type="large-v" />}
      >
        <MediaRow
          title="Similar To This"
          mediaType={props.query.mediaType}
          type="small-v"
          endpoint={`${props.query.mediaType === "movie" ? "movie" : "tv"}/${
            props.query.id
          }/similar?`}
        />
      </LazyLoad>
      <CastInfo mediaId={props.query.id} mediaType={props.query.mediaType} />
    </MainLayout>
  );
}

export async function getServerSideProps(context) {
  let mediaData;
  try {
    mediaData = await axios.get(
      `https://api.themoviedb.org/3/${context.query.mediaType}/${context.query.id}?api_key=f7e5193a85a5af98ed826e30d2e8a2c5&language=en-US&append_to_response=videos`
    );
  } catch (error) {
    console.log(error);
  }
  return {
    props: { mediaData: mediaData.data, query: context.query, hasVideo: mediaData.data.videos.results.length <= 0 ? false : true },
  };
}
