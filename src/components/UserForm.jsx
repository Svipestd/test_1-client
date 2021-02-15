import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { profileActions, updateUserData } from "../store/profileReducer";
import { validateUserForm } from "../utils/validators";
import { Errors } from "./Errors";

import { Button, Form, Segment } from "semantic-ui-react";
import '../styles/UserForm.css';

const UserForm = () => {
  const dispatch = useDispatch();
  const requestErrors = useSelector(state => state.app.errors);
  const isLoading = useSelector(state => state.app.isLoading);
  const token = useSelector(state => state.authPage.user.token);
  const { firstname, lastname, age, city } = useSelector(state => state.profilePage.user);

  const [userValues, setUserValues] = useState({ firstname, lastname, age, city, });
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    return () => { dispatch(profileActions.setEditMode(false)) }
  }, [])

  const onChange = (event) => {
    setUserValues({ ...userValues, [event.target.name]: event.target.value });
  }

  const handleUpdateUserData = (event) => {
    event.preventDefault();
    const validateErrors = validateUserForm({ ...userValues });

    if (validateErrors.length > 0) {
      setErrors(validateErrors);
    } else {
      setErrors([]);
      dispatch(updateUserData(userValues, token));
      dispatch(profileActions.setEditMode(false));
    }
  }

  return (
    <Segment>
      <h2 className={'userFormTitle'}>Edit Profile</h2>
      <Form>
        <Form.Input
          name='firstname'
          type='text'
          label='Firstname'
          placeholder="Firstname.."
          onChange={onChange}
          value={userValues.firstname}
        />
        <Form.Input
          name='lastname'
          type='text'
          label='Lastname'
          placeholder="Lastname.."
          onChange={onChange}
          value={userValues.lastname}
        />
        <Form.Input
          name='age'
          type='number'
          label='Age'
          placeholder="Age.."
          onChange={onChange}
          value={userValues.age}
        />
        <Form.Input
          name='city'
          type='text'
          label='City'
          placeholder="City.."
          onChange={onChange}
          value={userValues.city}
        />
        <Button
          type='submit'
          onClick={handleUpdateUserData}
          disabled={isLoading} primary>
          Save
        </Button>
      </Form>

      {errors.length > 0 && <Errors errors={errors} />}
      {requestErrors.length > 0 && <Errors errors={requestErrors} />}
    </Segment>
  )
}

export default UserForm;