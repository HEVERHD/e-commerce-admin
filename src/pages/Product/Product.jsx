import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import baseURL from '../../config/baseUrl';
import style from './Product.module.scss';
import {notifyError, notifySuccess} from '../../utils/notifications'

const Product = ()=>{
      const [details, setDetails] = useState();
      const {id}= useParams();

      console.log(details);

      useEffect(async ()=>{
            await baseURL.get(`product/${id}`)
            .then(res => setDetails(res.data))
            .catch(err => notifyError(err.response.data.error))
      },[]);

      return (
            <div>
                  <img src={details.image}/>
                  {details.Categories?.map(item =>{
                        return <h5>{item.name}</h5>
                  })}
                  <h1>{details.title}</h1>
                  <h3>{details.price}</h3>
                  <h3>{details.stock}</h3>
                  <h3>{details.sales}</h3>
                  <h4>{details.description}</h4>
            </div>
      )

}
export default Product;