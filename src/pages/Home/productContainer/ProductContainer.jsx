import { useNavigate } from 'react-router-dom';
import baseURL from '../../../config/baseUrl';

//COMPONENTES
import {notifyError, notifySuccess} from '../../../utils/notifications'
import { Button, SvgIcon } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import style from './ProductContainer.module.scss';

const ProductContainer = ( {id, title, price, stock, sales, discount, token} )=>{
      const navigate = useNavigate()
      const titleEdit = title.slice(0, 30)

      const deleteItem = ()=>{
            baseURL.delete(`admin/product/${id}`,{
                  headers:{
                        token
                  }
            })
            .then( res => notifySuccess(res.data.success))
            .catch(err => notifyError(err.response.data.error))
      }

      return(
            <div key={id} className={style.container} >
                  <h1> {titleEdit}... </h1>
                  <h1> $ {price} </h1>
                  <h1> {stock} </h1>
                  <h1> {sales} </h1>
                  <h1> {discount} </h1>

                  <div className={style.buttonContainer}>
                        <Button variant='contained' color='error' onClick={ deleteItem }>
                              <DeleteIcon />
                        </Button>
                        <Button variant='contained' color='success' onClick={()=>  navigate(`/product/${id}`)}>
                              <EditIcon />
                        </Button>

                  </div>
            </div>
      )
}

export default ProductContainer;