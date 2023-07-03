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
import axios from 'axios'
// import axios from 'axios'
// import { useNavigate, Link } from 'react-router-dom';
// import { useAuthContext } from 'src/context/AuthContext'

const EmailSent = (props) => {


  
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={10}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                <div className='text-center'>
                <h3>Congratulations! Reset Link has been sent to your email successfully. 🎉 </h3>
                <p>If you didn&apos;t get the email wait for a few minutes and then try again <Link to='/password-reset'>Here</Link></p>
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

export default EmailSent
