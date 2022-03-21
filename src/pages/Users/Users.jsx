import baseURL from "../../config/baseUrl";
import Sidebar from '../../components/SideBar/Sidebar';
import { useEffect } from "react";

/*
Traer todos los usuarios 
Mostrar los primeros 10 nuevos usuarios, y luego un boton para desplegar más 
Con un páginado de 20 por página
*/

const Users = ()=>{
      useEffect(async()=>{
            const result = await baseURL.get('admin/users')
            console.log(result)
      })
      return(
            <div>
                  <Sidebar/>
                  <h1>Está es la página User</h1>
            </div>
      )
}
export default Users;