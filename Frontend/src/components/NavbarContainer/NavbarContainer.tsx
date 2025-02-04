import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import {
  Box,
  List,
  CssBaseline,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from '@material-ui/core';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import { memo, useState, FC } from 'react';
import AppBarContainer from '../AppBarContainer/AppBarContainer';
import NavbarItems from './NavbarItems/NavbarItems';
import { INavbarComponentProps } from '../../types/components';

const drawerWidth = 240;

const openedMixin = (theme: any) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: any) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: prop => prop !== 'open' })(
  // @ts-ignore
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const NavbarContainer: FC<INavbarComponentProps> = ({ auth, uid, logOut, navbarList, userName }) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBarContainer
        open={open}
        setOpen={setOpen}
        auth={auth}
        userName={userName ? userName : ''}
      />
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={() => setOpen(false)} data-testid="iconOpenBar">
            <ChevronLeftIcon />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <NavbarItems uid={uid} navbarList={navbarList} />
        <Divider />
        {auth && (
          <List>
            <ListItem button onClick={logOut}>
              <ListItemIcon>
                <MeetingRoomIcon />
              </ListItemIcon>
              <ListItemText primary="Выйти" />
            </ListItem>
          </List>
        )}
      </Drawer>
    </Box>
  );
};

export default memo(NavbarContainer);