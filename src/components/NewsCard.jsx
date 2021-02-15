import { useSelector } from "react-redux";
import moment from 'moment';

import { DeleteButton } from "./DeleteButton";

import { Card } from "semantic-ui-react";

const NewsCard = ({ news: { _id, title, text, username, createdAt } }) => {
  const user = useSelector(state => state.profilePage.user);

  return (
    <Card fluid className={'NewsCard'} >
      
      <Card.Content>
        <Card.Header>{title}</Card.Header>
        <Card.Meta>{moment(createdAt).fromNow(true)}</Card.Meta>
      </Card.Content>

      <Card.Content>
        <Card.Description>{text}</Card.Description>
      </Card.Content>

      <Card.Content extra>
        <Card.Meta>{username}</Card.Meta>
      </Card.Content>

        {user.username === username && (
          <DeleteButton id={_id} />
        )}
    </Card>
  )
}

export default NewsCard;