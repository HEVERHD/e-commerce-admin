import { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from "../../redux/actions";
import style from './Home.module.scss';

//COMPONENTES
import Sidebar from "../../components/SideBar/Sidebar";
import ProductContainer from './productContainer/ProductContainer';

const pageSize = 10 // Para cambiar el tamaño del paginado

const Home = ()=>{
      const [page, setPage] = useState(0);
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

                  <div className={style.tablecontainer}>

                        <h1>Total productos : {products.length} </h1>
                        <div className={style.categories}>
                              <h1>TITLE</h1>
                              <h1>PRICE</h1>
                              <h1>STOCK</h1>
                              <h1>SALES</h1>
                              <h1>DISCOUNT</h1>
                        </div>
                        <div className={style.productContainer}>
                              {products.result?.slice(page*pageSize,(page+1)*pageSize).map((item,index)=>{
                                    return <ProductContainer
                                          id = {item.id} 
                                          title = {item.title}
                                          price = {item.price}
                                          stock = {item.stock}
                                          sales = {item.sales}
                                          discount = {item.discount}
                                          token={token}
                                    />
                              })}
                        </div>

                        <div className={style.pag}>
                              <button type='button' onClick={()=>{
                                    if(page>0) setPage(page-1);
                              }}>
                                    Previous
                              </button>
                              <button type='button' onClick={()=>{
                                    if((page+1) * pageSize < products.length) setPage(page+1);
                              }}>
                                    Next
                              </button>
                        </div>
                  </div>


            </div>
      )
}
export default Home;
