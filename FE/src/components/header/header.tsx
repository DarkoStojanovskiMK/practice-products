
import './header.css'
import Logo from '../../assets/logo.svg?react'

import { useDispatch } from "react-redux";
import { clearAuth } from "../../api/apiRtk/auth/authSlice";
import { supabase } from "../../utils/supabase";
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {

  const dispatch = useDispatch();
  const SUPABASE_PROJECT_REF = import.meta.env.VITE_SUPABASE_PROJECT_REF;
  const onLogout = async () => {
    try {
      await supabase.auth.signOut({ scope: "local" });
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(clearAuth());
      localStorage.removeItem(`sb-${SUPABASE_PROJECT_REF}-auth-token`);
      sessionStorage.removeItem(`activeAccountId`);
    }
  };
  const navigate = useNavigate();
  return (
    <div className='header' >
        <Logo className = "logo" height={100} width={100} onClick={()=>navigate('/')} />
        <div>
            <button onClick={onLogout}>Sign Out</button>
            <button><Link to="/profile">Profile</Link></button>
            
        </div>
    </div>
  )
}

export default Header