import style from './CreateProduct.module.scss';


//COMPONENTES
import { notifyError, notifySuccess } from '../../utils/notifications';
import baseURL from '../../config/baseUrl';
import {TextField, Button} from '@mui/material'
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const CreateProduct = ()=>{
      const token = useSelector(state => state.currentUser.accessToken);
      console.log(token);
      const [categories, setCategories] = useState([]);
      const [product, setProduct] = useState({
            image : '',
            title : '',
            categories : '',
            description : '',
            price : '',
            stock : ''
      })

      const handlerChange = (event)=>{
            switch(event.target.name){
                  case "category":
                        console.log('Hola')
                        setProduct({
                              ...product,
                              categories : [...product.categories, event.target.value]
                        })
                        return;
                  default:
                        console.log('Hola2')
                        setProduct({
                              ...product,
                              [event.target.name] : event.target.value
                        })
            }            
      };

      const handlerSubmit = (event)=>{
            event.preventDefault();
            console.log(product)
            baseURL.post('product', {...product}, {
                  headers:{
                        token
                  }
            })
            .then(res => notifySuccess(res.data.success))
            .catch(err => notifyError(err.response.data.error));
      }

      useEffect(async ()=>{
            await baseURL.get('category')
            .then(res => setCategories(res.data))
            .catch(err => notifyError(err.response.data.error))
      },[])

      return(
            <div className={style.container}>
                  <Button onClick={()=> window.history.go(-1)} variant="contained">Back</Button>
                  <form onSubmit={ handlerSubmit } className={style.formContainer}>
                        
                        <input 
                              type='file' 
                              name='image'
                              accept="image/png, image/jpeg" 
                              id='prueba'
                              onChange = {handlerChange}
                        />

                        <select onChange={handlerChange} name='category'>
                              {categories.length ? categories.map(item => <option>{item.name}</option>) : ''}
                        </select>

                        <TextField
                              label='Title'
                              name='title'
                              onChange = {handlerChange}
                        />
                        
                        <TextField 
                              label= 'Price'
                              name='price'
                              type='number'
                              onChange = {handlerChange}
                        />
                        <TextField
                              label= 'Stock'
                              name='stock'
                              type='number'
                              onChange = {handlerChange}
                        />
                        <textarea
                              rows={15}
                              cols={80}
                              name='description'
                              placeholder='Description'
                              onChange = {handlerChange}
                        />
                        <Button type='submit' variant="contained">Crear</Button>
                  </form>
            </div>
      )
}

export default CreateProduct;