import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import UserForm from '../components/UserForm';
import UserInfo from '../components/UserInfo';
import {  setUserData } from '../store/profileReducer';

import { Loader } from 'semantic-ui-react'

const Profile = () => {
  const dispatch = useDispatch();
  const editMode = useSelector(state => state.profilePage.editMode);
  const isLoading = useSelector(state => state.app.isLoading);
  const { userId, token } = useSelector(state => state.authPage.user);
  const user = useSelector(state => state.profilePage.user);

  useEffect(() => {
    dispatch(setUserData(userId, token))
  }, [setUserData, userId])

  if (isLoading) {
    return <Loader active inline='centered' />
  }

  return (
    <>
      {editMode
        ? (<UserForm />)
        : (<UserInfo user={user} />)}
    </>
  )
}

export default Profile;