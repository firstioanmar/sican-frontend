import { React } from 'react';
import { Paper, BottomNavigation, BottomNavigationAction } from '@mui/material';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';

const style = {
  root: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    borderRadius: 0,
    boxShadow: '0px -2px 5px rgba(0, 0, 0, 0.1)',
    background: '#ffffff',
  },
};

export default function BottomNavbar() {
  return (
    <Paper style={style.root} elevation={3}>
      <BottomNavigation
        value={window.location.href.indexOf('/settings') !== -1 ? '/settings' : '/home'}
        showLabels
      >
        <BottomNavigationAction
          component={Link}
          to="/home"
          label="Home"
          value="/home"
          icon={<HomeIcon />}
        />
        <BottomNavigationAction
          component={Link}
          to="/settings"
          label="Settings"
          value="/settings"
          icon={<SettingsIcon />}
        />
      </BottomNavigation>
    </Paper>
  );
}
