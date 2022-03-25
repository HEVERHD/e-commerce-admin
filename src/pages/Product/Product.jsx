import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

//COMPONENTES
import baseURL from '../../config/baseUrl';
import { notifyError, notifySuccess } from '../../utils/notifications';
import { TextField, Button, ButtonGroup } from '@mui/material';

import style from './Product.modules.css';

const Product = () => {
	const { id } = useParams();
	const token = useSelector((state) => state.currentUser.accessToken);

	const [categories, setCategories] = useState([]);
	const [details, setDetails] = useState({
		title: '',
		description: '',
		price: 0,
		stock: 0,
		sales: 0,
		image: '',
		discount: 0,
		categories: [],
	});

	// console.log(details);
	// console.log(categories);

	const handlerChange = (event) => {
		console.log(event.target.name, event.target.value);

		switch (event.target.name) {
			case 'category':
				console.log('Hola');
				setDetails({
					...details,
					categories: [...details.categories, event.target.value],
				});
				return;
			default:
				console.log('Hola2');
				setDetails({
					...details,
					[event.target.name]: event.target.value,
				});
		}
	};

	const handlerSubmit = (event) => {
		event.preventDefault();
		console.log(details);
		baseURL
			.put(
				`admin/product/update/${id}`,
				{ ...details },
				{
					headers: {
						token,
					},
				}
			)
			.then((res) => notifySuccess(res.data.success))
			.catch((err) => notifyError(err.response.data.error));
	};

	useEffect(async () => {
		await baseURL
			.get('category')
			.then((res) => setCategories(res.data))
			.catch((err) => notifyError(err.response.data.error));

		await baseURL
			.get(`product/${id}`)
			.then((res) => {
				setDetails({
					title: res.data.title,
					description: res.data.description,
					price: res.data.price,
					stock: res.data.stock,
					sales: res.data.sales,
					image: res.data.image,
					discount: res.data.discount,
					categories: res.data.Categories,
				});
			})
			.catch((err) => notifyError(err.response.data.error));
	}, []);

	return (
		<div className='container_gral_prod'>
			<div className='container_for_img'>
				<div className='img_txt'>
					<img className='img_prod' src={details.image} />
					<p>Categorias</p>
					{details.categories.map((item) => {
						return (
							<h5 className='txt_til' key={item.name}>
								{item.name}
							</h5>
						);
					})}
					<h3 className='txt_til'>Sales : {details.sales}</h3>
				</div>

				<form className='form_prod' onSubmit={handlerSubmit}>
					<label className='txt_til'>Categoria</label>
					<select
						className='select__'
						name='category'
						onChange={handlerChange}
						defaultChecked='Categoria'
					>
						{categories.map((item) => {
							return <option key={item.id}>{item.name}</option>;
						})}
					</select>

					<TextField
						className='textf_'
						label='Titulo'
						name='title'
						value={details.title}
						onChange={handlerChange}
					/>
					<TextField
						className='textf_'
						label='Precio'
						name='price'
						type='number'
						value={details.price}
						onChange={handlerChange}
					/>

					<TextField
						className='textf_'
						label='Cantidad'
						name='stock'
						type='number'
						value={details.stock}
						onChange={handlerChange}
					/>

					<textarea
						className='text_f_'
						value={details.description}
						name='description'
						onChange={handlerChange}
					/>

					<Button type='submit' variant='contained'>
						Actualizar
					</Button>
				</form>
			</div>
		</div>
	);
};
export default Product;
