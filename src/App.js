import React, { Component, Suspense } from 'react'
import { HashRouter, BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import './scss/style.scss'
import { useAuthContext } from './context/AuthContext'


const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))

const App=() =>  {
  const {isAuth} = useAuthContext()  
  console.log("🚀 ~ file: App.js:24 ~ App ~ isAuth:", isAuth)

 
    return (
      <BrowserRouter>
        <Suspense fallback={loading}>
          <Routes>
            <Route path="/login" name="Login Page" element={<Login />} />
            
            <Route exact path="/register" name="Register Page" element={<Register />} />
            <Route exact path="/404" name="Page 404" element={<Page404 />} />
            <Route exact path="/500" name="Page 500" element={<Page500 />} />

            

            <Route path="*" name="Home" element={isAuth?<DefaultLayout />:<Navigate to="/login" replace/>} />
           

          </Routes>
        </Suspense>
      </BrowserRouter>
    )
  
}

export default App
