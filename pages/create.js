import Head from 'next/head'
import { useStateContext } from '../components/HBOProvider';
import ls from 'local-storage';
import {v4} from 'uuid';
import { useRouter } from 'next/router';


export default function CreateUser() {
  const globalState = useStateContext();
  const router = useRouter();
  const saveUser = () => {
    let users = [],
    user;

    if(ls('users') < 1){
      users = [];
      user = {
        id: v4(),
        user: globalState.user,
        myListID: []
      }
      users.push(user);
      ls('users', users);
      router.push('/login');
      console.log('users: ',users);
      console.log('lsusers', ls('users'));
    } else {
      users = ls('users');
      user = {
        id: v4(),
        user: globalState.user,
        myListID: []
      }
      users.push(user);
      ls('users', users);
      console.log('users: ',users);
      console.log('lsusers', ls('users'));
      router.push('/login');
    }
  }
  return (
    <div>
      <div className="create-user">
        <div className="create-user__top">
          <div className="create-user__logo" />
          <span className="create-user__title">
            Who Is Watching?
          </span>
        </div>
        <div className="create-user__form">
            <img className="create-user__user-img" src={globalState.defaultUserImg} />
            <div className="create-user__input-group">
                <label>Name</label>
                <input value={globalState.user} onChange={globalState.createUserAction} type="text" className="create-user__inputText" />
                <div className="create-user__colors">

                <div className="create-user__color create-user__color--active" style={{ 
                        background: 'rgb(70,10,97)',
                        background: 'linear-gradient(135deg, rgba(70,10,97,1) 13%, rgba(104,9,121,1) 53%, rgba(0,212,255,1) 100%)' }} />

                <div className="create-user__color" style={{ 
                    background: 'rgb(70,10,97)',
                    background: 'linear-gradient(135deg, rgba(21,54,189,1) 13%, rgba(73,57,185,1) 52%, rgba(0,212,255,1) 100%)' }} />

                <div className="create-user__color" style={{ 
                    background: 'rgb(70,10,97)',
                    background: 'linear-gradient(135deg, rgba(154,1,44,1) 13%, rgba(210,32,32,1) 52%, rgba(232,141,141,1) 100%)' }} />

                <div className="create-user__color" style={{ 
                    background: 'rgb(70,10,97)',
                    background: 'linear-gradient(135deg, rgba(239,242,32,1) 13%, rgba(235,201,18,1) 52%, rgba(250,148,0,1) 100%)' }} />
                <div className="create-user__color" style={{ 
                    background: 'rgb(70,10,97)',
                    background: 'linear-gradient(135deg, rgba(32,154,242,1) 13%, rgba(221,56,56,1) 52%, rgba(250,0,221,1) 100%)' }} />
                </div>
            </div>
        </div>
        <div className="create-user__buttons">
          <button className="create-user__cancel">Cancel</button>
          <button className="create-user__save" onClick={saveUser} >Save</button>

        </div>
      </div>
    </div>
  )
}
