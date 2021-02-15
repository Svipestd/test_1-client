import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { logout } from '../store/authReducer';

import { Menu } from 'semantic-ui-react'

const MenuBar = () => {
  const dispatch = useDispatch()

  const [activeItem, setActiveItem] = useState('profile');

  const handleItemClick = (event, { name }) => setActiveItem(name);

  const handlelogout = () => {
    dispatch(logout())
  }

  return (
    <div>
      <Menu pointing secondary>
        <Menu.Item
          name='profile'
          active={activeItem === 'profile'}
          onClick={handleItemClick}
          as={Link}
          to='/profile'
        />
        <Menu.Item
          name='news'
          active={activeItem === 'news'}
          onClick={handleItemClick}
          as={Link}
          to='/news'
        />
        <Menu.Menu position='right'>
          <Menu.Item
            name='logout'
            active={activeItem === 'logout'}
            onClick={handlelogout}
            as={Link}
            to='login'
          />
        </Menu.Menu>
      </Menu>
    </div>
  )
}

export default MenuBar;