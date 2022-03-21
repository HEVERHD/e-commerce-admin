import style from './Sidebar.module.scss'

import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material'

const Sidebar = ()=>{
      const navigate = useNavigate();

      return (
            <div className={style.container}>
                  <Button variant="outlined" onClick={()=> navigate('/home')}>Home</Button>
                  <Button variant="outlined" onClick={()=>navigate('/users')}>Users</Button>
                  <Button variant="outlined" onClick={()=>navigate('/transactions')}>Transactions</Button>
            </div>
      )
}
export default Sidebar;