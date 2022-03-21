import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from "../../redux/actions";
import { useEffect } from "react";
import style from './Home.module.scss';

//COMPONENTES
import Sidebar from "../../components/SideBar/Sidebar";
import ProductContainer from './productContainer/ProductContainer';

/*
      Listado de los ultimos 10 productos creados, con opcion para ver todos
      Páginado que muestre 20 por página
      Opción de editar productos al tocar en el
      Opcion de crear más productos
*/

const Home = ()=>{
      const dispatch = useDispatch();
      const token = useSelector( state => state.currentUser.accessToken)

      //Buscamos todos los productos creados
      useEffect(()=>{
            dispatch( getAllProducts(token) )
      },[])

      const products = useSelector(state => state.allProducts)


      return (
            <div className={style.container}>
                  <Sidebar/>

                  <div className={style.productsContainer}>

                        <h1>Total productos : {products.length} </h1>
                        <div className={style.categories}>
                              <h1>TITLE</h1>
                              <h1>PRICE</h1>
                              <h1>STOCK</h1>
                              <h1>SALES</h1>
                              <h1>DISCOUNT</h1>
                        </div>

                        { products.result?.map( item =>{
                              return <ProductContainer 
                              id = {item.id} 
                              title = {item.title}
                              price = {item.price}
                              stock = {item.stock}
                              sales = {item.sales}
                              discount = {item.discount}
                              token={token}
                              />
                        })
                        }
                  </div>
            </div>
      )
}
export default Home;