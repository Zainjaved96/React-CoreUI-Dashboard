import React from 'react'
import { Link } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from 'src/context/AuthContext'

const Login = () => {

  const navigate = useNavigate(); 
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const {login, fetchId} = useAuthContext()  

  // Errors
  const [loginError , setLoginError] = useState(null)
  const [userError, setUserError] = useState(null)
  const [passError, setPassError] = useState(null)

  const handleLogin = async(e)=>{

  e.preventDefault();
  try {
    const response = await axios.post('http://127.0.0.1:8000/auth/jwt/create/', {
      username,
      password, 
    });

    // Store the access token and refresh token in localStorage
    localStorage.setItem('accessToken', response.data.access);
    localStorage.setItem('refreshToken', response.data.refresh);
    login()
    fetchId()
    navigate('/articles')  
    
    // Redirect or perform other actions upon successful login
   
  } catch (error) {
    setLoginError( error.response.data.detail)
    setPassError( error.response.data.password)
    setUserError( error.response.data.username)

    console.log(error.response.data.detail)
  //  console.log("🚀 ~ file: Login.js:27 ~ Login ~ username:", username)
    // console.error(error);
  }
}
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleLogin}>
                    <h1>Login</h1>
                    <p className="text-medium-emphasis">Sign In to your account</p>
                    <p className='text-danger fs-6 fw-bold py-2 m-0'>{userError? `${userError}!`: ''}</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput placeholder="Username" value={username} onChange={(e)=>setUsername(e.target.value)} type='text' autoComplete="username" />
                      <p></p>
                    </CInputGroup>
                    {/* password */}
                    <p className='text-danger fs-6 fw-bold py-2 m-0'>{passError? `${passError}!`: ''}</p>
                    <CInputGroup className="mb-4">
                      <CInputGroupText >
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        value={password} 
                        onChange={(e)=>setPassword(e.target.value)} 
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                      />
                    </CInputGroup>
                    <p className='text-danger fs-6 fw-bold py-2 m-0'>{loginError? `${loginError}!`: ''}</p>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" type='submit' className="px-4">
                          Login
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>New Here?</h2>
                    <p>
                      If you dont have an account signup now to get access to the coolest management system.
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
