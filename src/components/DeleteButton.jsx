import { useState } from "react"
import { useDispatch, useSelector } from "react-redux";

import { deleteNews } from "../store/newsReducer";

import { Button, Confirm } from "semantic-ui-react"

export const DeleteButton = ({ id }) => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.authPage.user.token);

  const [confirmOpen, setConfirmOpen] = useState(false);

  const handleDeleteNews = () => {
    dispatch(deleteNews(id, token));
  }

  return (
    <>
      <Button onClick={() => setConfirmOpen(true)}>
        Delete
      </Button>

      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={handleDeleteNews}
      />
    </>
  )
}