import { useDispatch, useSelector } from 'react-redux';

import { profileActions } from '../store/profileReducer';
import { Errors } from './Errors';

import { Button, Loader, Segment } from 'semantic-ui-react';
import '../styles/UserInfo.css';

const UserInfo = ({ user: { username, firstname, lastname, age, city } }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.app.isLoading);
  const requestErrors = useSelector(state => state.app.errors);

  const setEditMode = () => {
    dispatch(profileActions.setEditMode(true));
  }

  if (isLoading) {
    return <Loader active inline="centered" />
  }

  return (
    <>
      <Segment>
        <h2 className={'userInfoTitle'}>User Info</h2>
        <div>
          <ul className={'userInfoList'}>
            <li >
              <strong>Username:</strong>
              {username}
            </li>
            <li>
              <strong >Firstname:</strong>
              {firstname === '' ? 'Не указано' : firstname}
            </li>
            <li>
              <strong>Lastname:</strong>
              {lastname === '' ? 'Не указано' : lastname}
            </li>
            <li>
              <strong>Age:</strong>
              {age === 0 || age === null ? 'Не указано' : age}
            </li>
            <li>
              <strong>City:</strong>
              {city === '' ? 'Не указано' : city}
            </li>
          </ul>
          <div></div>
        </div>
      </Segment>

      <Button primary onClick={setEditMode}>
        Edit
      </Button>

      {requestErrors.length > 0 && <Errors errors={requestErrors} />}
    </>
  )
}

export default UserInfo;