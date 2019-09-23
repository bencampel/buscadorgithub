import React, {useReducer} from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';
import {
  SEARCH_USERS,
  GET_USER,
  GET_REPOS,
  CLEAR_USERS,
  SET_LOADING,
} from '../types';

let githubClientId;
let githubClientSecret;

if(process.env.NODE_ENV !== "production"){
  githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
  githubClientSecret = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
}else {
  githubClientId = process.env.GITHUB_CLIENT_ID;
  githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
}

const GithubState = (props) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false
  }

  const [state, dispatch] = useReducer(GithubReducer, initialState);
  
  //get users
  const searchUsers =  async (text) => {
    setLoading();

    const resp = await axios.get(`https://api.github.com/search/users?q=${text}&client_id=${githubClientSecret}&client_secret=${githubClientSecret}`);
    
    dispatch({type: SEARCH_USERS, payload: resp.data.items});

  }

  //get user
  const getUser = async (username) => {
    setLoading();

    const resp = await axios.get(`https://api.github.com/users/${username}?client_id=${githubClientId}&client_secret=${githubClientSecret}`);
    
    dispatch({type: GET_USER, payload: resp.data});
  }

  //get repos
  const getUserRepos = async (username) => {
    setLoading();

    const resp = await axios.get(`https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${githubClientId}&client_secret=${githubClientSecret}`);

    dispatch({type: GET_REPOS, payload: resp.data});
  
  }

  //clear users
  const clearUsers = () => dispatch({type: CLEAR_USERS});


  //set loading
  const setLoading = () => dispatch({type: SET_LOADING});

  return (
  <GithubContext.Provider 
    value={{
      users: state.users, 
      user: state.user,
      repos: state.repos,
      loading: state.loading,
      searchUsers,
      getUser,
      getUserRepos,
      clearUsers
    }}
  >
    {props.children}
  
  </GithubContext.Provider>)
    
}

export default GithubState
