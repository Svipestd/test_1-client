import { useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom'

import { Container } from "semantic-ui-react";
import MenuBar from "./components/MenuBar";
import Routes from './Routes';

import "semantic-ui-css/semantic.min.css";

const App = () => {
  const isAuthenticated = !!useSelector(state => state.authPage.user.token);

  return (
    <BrowserRouter>
      <Container >
        {isAuthenticated && <MenuBar/>}
        <Routes />
      </Container>
    </BrowserRouter>
  )
}

export default App;
