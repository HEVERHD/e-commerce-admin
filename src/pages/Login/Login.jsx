import style from './Login.module.scss';
import { useState } from 'react';
import { logIn } from '../../redux/actions';
import {
	Grid,
	CircularProgress,
	Typography,
	Button,
	Tabs,
	Tab,
	TextField,
	Fade,
} from '@material-ui/core'; //COMPONENT MATERIAL UI
// import classnames from "classnames";

//styles
import useStyles from './styles';

// logo
import logo from '../../image/Everylogopf gris.png';
import google from '../../image/google.png';

//COMPONENTES
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const Login = (props) => {
	var classes = useStyles();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [user, setUser] = useState({
		email: '',
		password: '',
	});

	const handlerSubmit = (event) => {
		event.preventDefault();
		dispatch(logIn(user.email, user.password, navigate));
	};

	const handlerChange = (event) => {
		setUser({
			...user,
			[event.target.name]: event.target.value,
		});
	};

	return (
		<div>
		      <form onSubmit={ handlerSubmit } className={style.container}>
		            <TextField
		                  type='email'
		                  name='email'
		                  label='Email'
		                  onChange={handlerChange}
		            />

		            <TextField
		                  type='password'
		                  name='password'
		                  label='Password'
		                  onChange={handlerChange}
		            />

		            <Button
		                  type='submit'
		                  variant='contained'
		            >
		                  Submit
		            </Button>
		      </form>
		</div>
		
	);
};
export default Login;
