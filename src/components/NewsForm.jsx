import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { setNewNews } from "../store/newsReducer";
import { validateNewsForm } from "../utils/validators";
import { Errors } from "./Errors";

import { Button, Form } from "semantic-ui-react"

const NewsForm = () => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.authPage.user.token);
  const requestErrors = useSelector(state => state.app.errors);
  const isLoading = useSelector(state => state.app.isLoading);

  const [newsValues, setNewsValues] = useState({ title: '', text: '' });
  const [errors, setErrors] = useState([]);

  const onChange = (event) => {
    setNewsValues({ ...newsValues, [event.target.name]: event.target.value });
  }

  const handleCreate = (event) => {
    event.preventDefault();
    const validateErrors = validateNewsForm({ ...newsValues });

    if (validateErrors.length > 0) {
      setErrors(validateErrors);
    } else {
      setErrors([]);
      setNewsValues({ title: '', text: '' });
      dispatch(setNewNews(newsValues, token));
    }
  }

  return (
    <>
      <Form>
        <Form.Input
          name='title'
          label='Title'
          placehodler='Title..'
          type='text'
          onChange={onChange}
          value={newsValues.title}
        />
        <Form.TextArea
          name='text'
          label='Text'
          placehodler='Text..'
          type='text'
          onChange={onChange}
          value={newsValues.text}
        />
        <Button
          type='submit'
          onClick={handleCreate}
          disabled={isLoading} primary>
          Create
        </Button>
      </Form>

      {errors.length > 0 && <Errors errors={errors} />}
      {requestErrors.length > 0 && <Errors errors={requestErrors} />}
    </>
  )
}

export default NewsForm;