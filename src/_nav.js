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
 
 
  
  {
    component: CNavItem,
    name: 'Charts',
    to: '/charts',
    icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Icons',
    icon: <CIcon icon={cilStar} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'CoreUI Free',
        to: '/icons/coreui-icons',
        badge: {
          color: 'success',
          text: 'NEW',
        },
      },
      {
        component: CNavItem,
        name: 'CoreUI Flags',
        to: '/icons/flags',
      },
      {
        component: CNavItem,
        name: 'CoreUI Brands',
        to: '/icons/brands',
      },
    ],
  },
 
 

]

export default _nav
