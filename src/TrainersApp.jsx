import { Navigate, Route, Routes } from 'react-router-dom'
import { TrainerAppRoutes } from './routes/TrainerAppRoutes'
import { LoginPage } from './auth/pages/LoginPage'
import { useContext } from 'react'
import { AuthContext } from './auth/context/AuthContext'



export const TrainersApp = () => {

  const {
    login
  } = useContext(AuthContext);

  return (

    <Routes>
      {
        login?.isAuth
          ?
            <Route path="/*" element={<TrainerAppRoutes />} />
          :
          <>
            <Route path='/*' element={<Navigate to="/login" />} />
            <Route path='/login' element={<LoginPage />} /> 
          </>

      }
    </Routes>
  )
}
