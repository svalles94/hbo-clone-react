import Head from "next/head";
import { useStateContext } from "../../../components/HBOProvider";
import { useEffect } from "react";
import Login from "../../../components/UI/Login/Login";
import { useRouter } from "next/router";
import MainLayout from "../../../components/Layouts/MainLayout";
import FeaturedMedia from "../../../components/UI/FeaturedMedia/FeaturedMedia";
import AuthCheck from "../../../components/AuthCheck";
import MediaRow from "../../../components/UI/MediaRow/MediaRow";
import LazyLoad from "react-lazyload";
import PlaceHolders from "../../../components/UI/Placeholder/PlaceHolders";
import GenreNav from "../../../components/UI/GenreNav/GenreNav";
import axios from "axios";
import { shuffleArray } from "../../../components/utilities";


export default function MediaTypePage(props) {
  const globalState = useStateContext();
  const router = useRouter();
  
  const showRandomMedia = () => {
    let thumbType;
    return props.genresData.map((item, index) => {
        thumbType = shuffleArray(globalState.thumbTypes)[0];
        return(
            <div key={item.id}>
            <LazyLoad
        offset={-200}
        placeholder={<PlaceHolders title={item.name} type={thumbType} key={item.id} />}
      >
        <MediaRow
          updateData={props.query.genre_id}
          title={item.name}
          type={thumbType}
          mediaType={props.query.mediaType}
          endpoint={`discover/${props.query.mediaType}?with_genres=${props.query.genre_id}&sort_by=popularity.desc&primary_release_year=2021&page=${index + 1}`}
        />
      </LazyLoad>
      </div>
        )
    })
  }
  
  return AuthCheck(
    <MainLayout>
      <FeaturedMedia
        type="single"
        imageUrl={`https://image.tmdb.org/t/p/w1280${props.featuredData.backdrop_path}`}
        title={props.query.mediaType === 'movie' ? props.featuredData.title : props.featuredData.name}
        linkUrl={`/${props.query.mediaType}/${props.featuredData.id}`}
        mediaType={props.query.mediaType}
        mediaId={props.featuredData.id}
      />
      <GenreNav mediaType={props.query.mediaType} genresData={props.genresData} />
        {showRandomMedia()}   
    </MainLayout>
  );
}

export async function getServerSideProps(context) {
    let genresData;
    let featuredData;
    try {
        genresData = await axios.get(`https://api.themoviedb.org/3/genre/${context.query.mediaType}/list?api_key=f7e5193a85a5af98ed826e30d2e8a2c5&language=en-US`);
        featuredData = await axios.get(`https://api.themoviedb.org/3/discover/${context.query.mediaType}?api_key=f7e5193a85a5af98ed826e30d2e8a2c5&language=en-US&sort_by=popularity.desc&primary_release_year=2021&with_genres=${context.query.genre_id}`);
    } catch (error) {
        console.log("error");
        console.log(error);
    }
    return {
        props: {
            genresData: genresData.data.genres,
            featuredData: shuffleArray(featuredData.data.results)[0],
            query: context.query
        }
    }
  }
  