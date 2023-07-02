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
import { cilEnvelopeClosed
} from '@coreui/icons'
import { useState } from 'react'
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom';
// import { useAuthContext } from 'src/context/AuthContext'

const PasswordReset = () => {

//   const navigate = useNavigate(); 
  const [Email, setEmail] = useState('')

  
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm >
                    <h1>Password Recovery</h1>
                    <p className="text-medium-emphasis">We will send a link to this email shortly.</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilEnvelopeClosed}/>
                      </CInputGroupText>
                      <CFormInput placeholder="Johndoe@gmail.com" value={Email} onChange={(e)=>setEmail(e.target.value)} type='email'  />
                      <p></p>
                    </CInputGroup>
                    {/* password */}
                   
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" type='submit' className="px-4">
                          Send Email
                        </CButton>
                      </CCol>
                     
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-black py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Forgot Your Password?</h2>
                    <p>
                      Don&apos;t Worry if you have forgotten your password with our password recovery system you will receive a link that you can use to reset your password.
                    </p>
                    <Link to="/login">
                      <CButton color="primary" className="mt-3" active tabIndex={-1}>
                        Login!
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

export default PasswordReset
