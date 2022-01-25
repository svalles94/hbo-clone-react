import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ls from 'local-storage';
import { useMounted } from './Hooks/useMounted';
import Login from './UI/Login/Login';

const AuthCheck = (component) => {
const [userLoggedIn, setUserLoggedIn] = useState(false);
const router = useRouter();
const {hasMounted} = useMounted();
let activeUID = ls('activeUID');    
let users = ls('users') !== null ? ls('users') : [];

useEffect(() => {
    // if(users.length >= 1) {
    //     router.push('/login');
    // }
    if(users.length > 0 && activeUID == 'null'){
        router.push('/login');
    }
    if(users.length < 1) {
        router.push('/create');
    }
}, [])

if(users.length >= 1 && activeUID !== null ) {
    return hasMounted ? (component) : (
        <div className="create-user">
            <div className="create-user__top">
                <div className="create-user__logo">
                </div>
            </div>
        </div>
    )
} else if(users.length >= 1 && activeUID == null) {
    return(
        <Login />
    )
} else {
    return(
        <div className="create-user">
            <div className="create-user__top">
                <div className="create-user__logo">
                </div>
            </div>
        </div>
    )
}

return component;
}
export default AuthCheck;