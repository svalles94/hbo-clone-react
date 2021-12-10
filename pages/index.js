import Head from 'next/head';
import { useStateContext } from '../components/HBOProvider';
import { useEffect } from 'react';
import Login from '../components/UI/Login/Login';
import { useRouter } from 'next/router';

export default function Home() {
  const globalState = useStateContext();
  const router = useRouter();
  useEffect(() => {
    const loggedIn = false;
    if(loggedIn === false) {
      router.push('/create')
    }
  }, [])
  return (
    <div>
      <Login />
    </div>
  )
}
