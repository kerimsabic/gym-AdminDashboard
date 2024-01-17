import { RootState } from '@/store'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
//import { loginfulfileld } from '@/store/authSlice';

type Props = {}

const ProtectedRoutes = (props: Props) => {
    const { userToken } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();
   

   /* useEffect(() => {
        const storedToken = localStorage.getItem('userToken');
        if (storedToken && !userToken) {
         /// dispatch(loginfulfilled({ token: storedToken }));
        }
      }, [dispatch, userToken]);*/

    if (!userToken) {
        return (
            <div className='flex justify-center'>
                <h1>Unauthorized:</h1>
                <span>
                    <NavLink to='/login'>Login</NavLink> to gain access.
                </span>
                
            </div>
        )
    }
    return (
        <Outlet/ >
    )
}

export default ProtectedRoutes