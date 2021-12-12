import Head from 'next/head';
import { useStateContext } from '../components/HBOProvider';
import { useEffect } from 'react';
import Login from '../components/UI/Login/Login';
import { useRouter } from 'next/router';
import MainLayout from '../components/Layouts/MainLayout'
import FeaturedMedia from '../components/UI/FeaturedMedia/FeaturedMedia'
import AuthCheck from '../components/AuthCheck';
import MediaRow from '../components/UI/MediaRow/MediaRow';


export default function Home() {
  const globalState = useStateContext();
  const router = useRouter();
  useEffect(() => {
    
  }, [])
  return AuthCheck(
    <MainLayout>
    <FeaturedMedia />
    <MediaRow title="Popular Movies" type="large-v" endpoint='discover/movie?sort_by=popularity.desc' />
    <MediaRow title="Series" type="small-v" endpoint='discover/tv?sort_by=popularity.desc'/>
    <MediaRow title="Action" type="small-v" endpoint='discover/movie?with_genres=28'/>
    <MediaRow title="Horror" type="small-v" endpoint='discover/movie?with_genres=27'/>
    <MediaRow title="Sci-Fi" type="small-v" endpoint='discover/movie?with_genres=878'/>
    <MediaRow title="Animations" type="small-h" endpoint='discover/movie?with_genres=16'/>
    <MediaRow title="Comedy" type="small-v" endpoint='discover/movie?with_genres=35'/>
    </MainLayout>
  )
}
