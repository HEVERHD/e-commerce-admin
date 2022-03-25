import style from './Sidebar.module.scss';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { List, Typography } from '@mui/material';
import DehazeIcon from '@mui/icons-material/Dehaze';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import ListItem from '@material-ui/core/ListItem';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import Container from '@material-ui/core/Container';
import { AppBar } from '@mui/material';

import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { Box } from '@mui/system';
import { Home } from '@mui/icons-material';

import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		marginRight: 'auto',
	},
	drawer: {
		width: 300,
		marginTop: 100,
	},
	iconAlign: {
		marginRight: 160,
	},
	ListItem: {
		marginTop: 10,
	},
	content: {
		padding: theme.spacing(9),
	},
}));

const Sidebar = () => {
	const user = useSelector((state) => state.currentUser);
	const classes = useStyles();
	const [open, setOpens] = useState(false);
	const navigate = useNavigate();

	return (
		// <div className={style.container}>
		//       <Button variant="outlined" className='btn_mui' onClick={()=> navigate('/home')}>Home</Button>
		//       <Button variant="outlined" className='btn_mui' onClick={()=>navigate('/users')}>Users</Button>
		//       <Button variant="outlined" className='btn_mui' onClick={()=>navigate('/transactions')}>Transactions</Button>
		// </div>
		<>
			<Container className={classes.root}>
				<Drawer open={open} onClose={() => setOpens(false)}>
					<Box
						display='flex'
						p={4}
						mt={5}
						justifyContent='space-between'
						fontWeight={600}
					>
						<Typography>
							<Box mt={2} fontWeight='fontWeigthBold'>
								Hola Admin {user.name}
							</Box>
							<Box fontWeight='fontWeigtLight' ml={4} fontSize={14}>
								¿qué deseas hacer?
							</Box>
						</Typography>
					</Box>

					<List className={classes.drawer}>
						<ListItem
							onClick={() => navigate('/home')}
							button
							className={classes.ListItem}
						>
							<Home />
							<Box pl={1} type='paragraph' color='inherit'>
								Todos los productos
							</Box>
						</ListItem>
						<ListItem
							onClick={() => navigate('/users')}
							button
							className={classes.ListItem}
						>
							<PersonIcon />
							<Box pl={1} type='paragraph' color='inherit'>
								Lista de usuarios
							</Box>
						</ListItem>

						<ListItem button>
							<PersonIcon />
							<Box pl={1} type='paragraph' color='inherit'>
								Roles
							</Box>
						</ListItem>
					</List>
				</Drawer>

				<AppBar style={{ backgroundColor: '#2E3B55' }}>
					<Toolbar>
						<Typography type='title' color='inherit' style={{ flex: 1 }}>
							Panel Administrativo Everyone
						</Typography>
						<IconButton
							edge='start'
							className={classes.menuButton}
							color='inherit'
							onClick={() => setOpens(true)}
						>
							<DehazeIcon />
						</IconButton>
					</Toolbar>
				</AppBar>
			</Container>
		</>
	);
};
export default Sidebar;
