import React from 'react'
import {CSpinner} from '@coreui/react'

const Loader1 = () => {
  return (
    <div
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 9999,
    }}
  >
    <CSpinner />
  </div>
  )
}

export default Loader1