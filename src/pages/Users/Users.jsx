import baseURL from "../../config/baseUrl";
import Sidebar from '../../components/SideBar/Sidebar';
import { useEffect, useState } from "react";
import { deleteUser, getAllUsers } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import style from './Users.module.scss';
import { Link } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
/*
Traer todos los usuarios 
Mostrar los primeros 10 nuevos usuarios, y luego un boton para desplegar más 
Con un páginado de 20 por página
*/

const pageSize = 10 // Para cambiar el tamaño del paginado

const Users = ()=>{

      const [state, setState] = useState(false)

      const [page, setPage] = useState(0)

      const dispatch = useDispatch()

      const users = useSelector(state=>state.allUsers)
      const adminToken = useSelector(state=>state.currentUser.accessToken)

      useEffect(()=>{
            dispatch(getAllUsers(adminToken))
      },[state, dispatch])

      console.log(users)
      return(
            <div className={style.container}>
                  <Sidebar/>
                  <h1>Users</h1>
                  <table className={style.usersTable}>
                        <tr>
                              <th>Email</th>
                              <th>Name</th>
                              <th>Country</th>
                              <th>Creation date</th>
                              <th>User type</th>
                              <th>Actions</th>
                        </tr>

                        {users.slice(page*pageSize,(page+1)*pageSize).map((e,i)=>{
                        let date = new Date()
                        let time = e.createdAt.split('T')[0].split('-').reverse()
                        let yearsDiff = date.getFullYear()-time[2]
                        let monthsDiff = date.getMonth()+1-time[1]
                              return <tr className={style.selected}>
                                    <td>{e.email}</td>
                                    <td>{e.name+' '+e.lastName}</td>
                                    <td>{e.country}</td>
                                    <td>{time.join('/')}{yearsDiff+monthsDiff
                                          ?', '+(yearsDiff?yearsDiff+' year'+(yearsDiff===1?'':'s'):'')+' '+(monthsDiff?monthsDiff+' month'+(monthsDiff===1?'':'s'):'')+' ago'
                                          :''}</td>
                                    <td>{e.isAdmin?'Admin':'Client'}</td>
                                    <td className={style.options}>
                                          <button className={style.edit}>
                                                <Link to={`edit/${e.id}`} state={users[i]}>
                                                      <span>Edit</span>
                                                </Link>
                                          </button>

                                          <button className={style.erase} onClick={()=>{
                                                dispatch(deleteUser(e.id, adminToken))
                                                setState(!state)
                                          }}>
                                                <span>Delete</span>
                                          </button>
                                    </td>
                              </tr>
                        })}

                  </table>
                  <div className={style.pag}>
                        <button type='button' onClick={()=>{
                              if(page>0) setPage(page-1)
                        }}>
                              Previous
                        </button>
                        <button type='button' onClick={()=>{
                              if((page+1)*pageSize<users.length) setPage(page+1)
                        }}>
                              Next
                        </button>
                  </div>
            </div>
      )
}
export default Users;
// {new Date().getFullYear()-time.split('/')[0]}{new Date().getMonth()}