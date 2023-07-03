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
import {  cilLockLocked
} from '@coreui/icons'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
// import { useAuthContext } from 'src/context/AuthContext'

const PasswordReset = () => {

//   const navigate = useNavigate(); 
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const url = new URL(window.location.href);
  const searchParams = new URLSearchParams(url.search);

  const uuid = searchParams.get('uuid');
  const token = searchParams.get('token');

  const handleSubmit = async (e)=>{
      e.preventDefault()
      try {
        const payload = {
          "uid": uuid,
          "token": token,
          "new_password": password
        }

        await axios.post('http://127.0.0.1:8000/user/users/reset_password_confirm/',payload)
        // Redirect after confirmation
        navigate('/login')
      }
      catch(error){
        console.error(error)
        alert('Something went wrong')
      }
  }
  
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody >
                  <CForm onSubmit={handleSubmit} >
                    <h1>Set a New Password</h1>
                    <p className="text-medium-emphasis">Make sure the password is strong.</p>
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

                  
                    {/* password */}
                   
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" type='submit' className="px-4">
                         confirm
                        </CButton>
                      </CCol>
                     
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
             
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default PasswordReset
