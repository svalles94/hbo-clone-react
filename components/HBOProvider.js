import React, { useContext, useState } from 'react';
import ls from 'local-storage';

export const StateContext = React.createContext();

export function useStateContext() {
    return useContext(StateContext)
}

export function HBOProvider({children}){
    const [user, setUser] = useState('');
    const defaultUserImg = 'https://images.unsplash.com/photo-1510227272981-87123e259b17?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=3759e09a5b9fbe53088b23c615b6312e';
    const createUserAction = (e) => {
        setUser(e.target.value);
        // console.log(user);        
    }
    const [sideNavOpen, setSideNavOpenAction] = useState(false);
    const [accountModalOpen, setAccountModalOpenAction] = useState(false);
    const [searchOpen, setSearchOpenAction] = useState(false);
    const [watchList, setWatchList] = useState(ls.get('myList'));
    const addToList = (video) => {
        let myList;
        if(ls('myList') !== null) {
            myList = ls.get('myList');
            myList.push(video);
            ls.set('myList', myList);
            setWatchList(myList);
        } else {
            ls.set('myList', [video]);
        }
    }
    const removeFromList = (videoId) => {
        let myList = ls.get('myList');
        // console.log("removed", videoId);
        myList = myList.filter((item) => item.mediaId != videoId);
        ls.set('myList', myList);
        setWatchList(myList);
    }

    const thumbTypes = ['large-v', 'small-v', 'large-h', 'small-h'];

    return(
        <StateContext.Provider
        value={{ 
            user,
            createUserAction,
            defaultUserImg,
            sideNavOpen,
            setSideNavOpenAction,
            accountModalOpen,
            setAccountModalOpenAction,
            searchOpen,
            setSearchOpenAction,
            thumbTypes,
            removeFromList,
            addToList,
            watchList
         }}>
             {children}
         </StateContext.Provider>
    )
}