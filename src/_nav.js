import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilCalculator,
  cilChartPie,
  cilNewspaper,
  cilPenAlt,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPeople,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Reporters',
    to: '/reporters',
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
    
  },
  {
    component: CNavItem,
    name: 'Articles',
    to: '/articles',
    icon: <CIcon icon={cilPenAlt} customClassName="nav-icon" />,
    
  },
  {
    component: CNavItem,
    name: 'Publishers',
    to: '/publishers',
    icon: <CIcon icon={cilNewspaper} customClassName="nav-icon" />,
    
  },
 

]

export default _nav
