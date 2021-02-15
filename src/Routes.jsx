import { useSelector } from "react-redux";
import { Route, Redirect, Switch } from "react-router-dom";

import Auth from "./pages/Auth";
import News from "./pages/News";
import Profile from "./pages/Profile";

const Routes = () => {
  const isAuthenticated = !!useSelector(state => state.authPage.user.token);

  if (isAuthenticated) {
    return (
      <Switch>
        <Route exact path='/profile'>
          <Profile />
        </Route>
        <Route exact path='/news'>
          <News />
        </Route>
        <Redirect to='/profile' />
      </Switch>
    )
  }

  return (
    <Switch>
      <Route exact path='/login'>
        <Auth />
      </Route>
      <Redirect to='/login' />
    </Switch>
  )
}

export default Routes;