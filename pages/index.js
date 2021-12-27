import Head from "next/head";
import { useStateContext } from "../components/HBOProvider";
import { useEffect } from "react";
import Login from "../components/UI/Login/Login";
import { useRouter } from "next/router";
import MainLayout from "../components/Layouts/MainLayout";
import FeaturedMedia from "../components/UI/FeaturedMedia/FeaturedMedia";
import AuthCheck from "../components/AuthCheck";
import MediaRow from "../components/UI/MediaRow/MediaRow";
import LazyLoad from 'react-lazyload';
import PlaceHolders from "../components/UI/Placeholder/PlaceHolders";

export default function Home() {
  const globalState = useStateContext();
  const router = useRouter();
  useEffect(() => {}, []);
  return AuthCheck(
    <MainLayout>
      <FeaturedMedia type="front" mediaUrl="https://www.youtube.com/embed/-FmWuCgJmxo?mute=1&autoplay=1" title="Venom 2: let there be carnage" location='In theaters and on HBO MAX. Streaming throughout May 23.' linkUrl='/movies/id'/>
      <LazyLoad offset={-400} placeholder={<PlaceHolders title="Popular Movies" type="large-v"/>}>
      <MediaRow
        title="Popular Movies" 
        type="large-v"
        endpoint="discover/movie?sort_by=popularity.desc"
      />
      </LazyLoad>
      <LazyLoad offset={-400} placeholder={<PlaceHolders title="Series" type="small-v"/>}>
      <MediaRow
        title="Series" 
        type="small-v"
        endpoint="discover/tv?sort_by=popularity.desc"
      />
      </LazyLoad>
      <LazyLoad offset={-400} placeholder={<PlaceHolders title="Action" type="small-v"/>}>
      <MediaRow
        title="Action" 
        type="small-v"
        endpoint="discover/movie?with_genres=28"
      />
      </LazyLoad>
      <LazyLoad offset={-400} placeholder={<PlaceHolders title="Horror" type="small-v"/>}>
      <MediaRow
        title="Horror" 
        type="small-v"
        endpoint="discover/movie?with_genres=27"
      />
      </LazyLoad>
      <LazyLoad offset={-400} placeholder={<PlaceHolders title="Sci-Fi" type="small-v"/>}>
      <MediaRow
        title="Sci-Fi" 
        type="small-v"
        endpoint="discover/movie?with_genres=878"
      />
      </LazyLoad>
      <LazyLoad offset={-400} placeholder={<PlaceHolders title="Animations" type="small-h"/>}>
      <MediaRow
        title="Animations"
        type="small-h"
        endpoint="discover/movie?with_genres=16"
      />
      </LazyLoad>
      <LazyLoad offset={-400} placeholder={<PlaceHolders title="Comedy" type="small-v"/>}>
      <MediaRow
        title="Comedy"
        type="small-v"
        endpoint="discover/movie?with_genres=35"
      />
      </LazyLoad>
      
    </MainLayout>
  );
}
