import React, { useContext } from 'react';
import dig from "object-dig";
import { AuthContext } from '../providers/Auth.Provider';
import  ViewLogin  from './pages/Login';
import Loading from './pages/Loading';
import ViewMainPage from './pages/MainPage';

const ViewPage = () =>{
    const {currentUser, isLoading} = useContext(AuthContext);
    const loginCheck = dig(currentUser, 'auth', 'currentUser', 'uid');
    const viewAreaRender = () => {

        if (isLoading) {
            return (<Loading />);
        } else if (loginCheck) {
            return (<ViewMainPage />);
        } else {
            return (<ViewLogin />);
        }

    }  
    return (
        <>
            { viewAreaRender() }
        </>
    );
}

export default ViewPage;