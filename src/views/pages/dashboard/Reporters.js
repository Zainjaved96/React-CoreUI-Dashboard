import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import {
  CModal,
  CModalHeader,
  CButton,
  CModalTitle,
  CModalBody,
  CCard,
  CCardBody,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'

const Reporters = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [url, setUrl] = useState(`http://127.0.0.1:8000/blog_service/reporter/?search_key=`)
  const [count, setCount] = useState(0)
  const [next, setNext] = useState(null)
  const [prev, setPrev] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [updateId, setUpdateId] = useState(false)
  const [users, setUsers] = useState(null)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [show, setShow] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)

  //   Handling Modal
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const fetchData = async (url) => {
    console.log(searchQuery)
    try {
      if (searchQuery != '') {
        url = url + searchQuery
      }

      const response = await axios.get(url)

      setUsers(response.data.results.reverse())
      setCount(response.data.count)
      setNext(response.data.next)
      setPrev(response.data.previous)
      setIsLoading(false)
    } catch (error) {
      console.error('Error fetching data:', error)  
    }
  }

  useEffect(() => {
    fetchData(url)
  }, [searchQuery])

  useEffect(() => {
    fetchData(url)
    setFormSubmitted(false)
  }, [formSubmitted])

  const handleSubmit = async (event) => {
    event.preventDefault()
    const newUser = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      company: company,
    }

    if (updating) {
      try {
        await axios.put(`http://127.0.0.1:8000/blog_service/reporter/${updateId}`, newUser)
        fetchData(url)
        // Reset the form after successful submission

        showNoti('updateNotification')
        setUpdating(false)
      } catch (error) {
        console.error('Error adding user:', error)
        alert('BAD REQUEST')
      }
    } else {
      try {
        await axios.post('http://127.0.0.1:8000/blog_service/reporter/', newUser)
        showNoti('successNotification')
      } catch (error) {
        console.error('Error adding user:', error)
        alert('BAD REQUEST')
      }
    }
    handleClose()
    setFormSubmitted(true)
    setFirstName('')
    setLastName('')
    setEmail('')
    setCompany('')
  }

  function showNoti(id) {
    const noti = document.getElementById(id)
    noti.classList.remove('d-none')
    setTimeout(function () {
      noti.classList.add('d-none')
    }, 2000)
  }

  const handleDelete = async (event) => {
    const userId = event.target.id
    try {
      const response = await axios.delete(`http://127.0.0.1:8000/blog_service/reporter/${userId}`)
      showNoti('deleteNotification')
      fetchData(url)

      // Reset the form after successful submission
    } catch (error) {
      console.error('Error adding user:', error)
    }
  }

  const handleEdit = async (event) => {
    handleShow()
    // Fetching data to store in the form
    const userId = event.target.id

    const first_name = event.target.closest('.reporter-row').querySelector('.first-name').textContent
    const last_name = event.target.closest('.reporter-row').querySelector('.last-name').textContent
    const email = event.target.closest('.reporter-row').querySelector('.email').textContent
    const company = event.target.closest('.reporter-row').querySelector('.company').textContent

    setFirstName(first_name)
    setLastName(last_name)
    setEmail(email)
    setUpdating(true)
    setUpdateId(userId)
    setCompany(company)
  }

  const handleInfo = (event) => {
    setShowInfo(!showInfo)
    // fetching data for info
    const userId = event.target.id
    const first_name = event.target.closest('.reporter-row').querySelector('.first-name').textContent
    const last_name = event.target.closest('.reporter-row').querySelector('.last-name').textContent
    const email = event.target.closest('.reporter-row').querySelector('.email').textContent
    const company = event.target.closest('.reporter-row').querySelector('.company').textContent
    setFirstName(first_name)
    setCompany(company)
    setUpdateId(userId)
    setLastName(last_name)
    setEmail(email)
  }

  const handleNext = () => {
    if (next) {
      setUrl(next)
      fetchData(next)
    }
  }

  const handlePrev = () => {
    if (prev) {
      setUrl(prev)
      fetchData(prev)
    }
  }

  return (
    <>
      {/* Notifications */}
      <div
        id="successNotification"
        className="fixed-top w-25  alert bg-primary text-white d-none "
        role="alert"
        style={{
          left: '1000px',
          top: '55px',
        }}
      >
        Item Added successfully!
      </div>
      <div
        id="updateNotification"
        className="fixed-top w-25  alert bg-primary text-white d-none "
        role="alert"
        style={{
          left: '1000px',
          top: '55px',
        }}
      >
        Item Updated successfully!
      </div>
      <div
        id="deleteNotification"
        className="fixed-top w-25  alert bg-danger text-white d-none "
        role="alert"
        style={{
          left: '1000px',
          top: '55px',
        }}
      >
        Item deleted successfully!
      </div>

      {/* Modal */}
      {/* Form Modal */}
      <CModal visible={show} onClose={() => setShow(false)}>
        <CModalHeader onClose={() => setShow(false)}>
          <CModalTitle>Reporter Form</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <form className="col-lg-8 mx-auto needs-validation" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                placeholder="Steven"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                placeholder="Smith"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="company" className="form-label">
                Company
              </label>
              <input
                type="text"
                className="form-control"
                id="company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                required
                placeholder="CNN"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                }}
                required
                placeholder="name@example.com"
              />
            </div>
            <button type="submit" className="btn btn-lg btn-success text-white">
              Submit
            </button>
          </form>
        </CModalBody>
      </CModal>

      {/* Info Modal */}
      <CModal visible={showInfo} onClose={() => setShowInfo(false)}>
        <CModalHeader onClose={() => setShow(false)}></CModalHeader>
        <CModalBody>
          <div className="">
            <div className="card">
              <div className="card-body">
                <center className="m-t-30">
                  {/* {' '} */}
                  <img
                    src={`https://xsgames.co/randomusers/assets/avatars/male/${updateId}.jpg`}
                    className="img-circle rounded-circle"
                    width={150}
                  />
                  <h4 className="card-title m-t-10">
                    {firstName} {lastName}
                  </h4>
                 
                </center>
              </div>
              <div>
                <hr />{' '}
              </div>
              <div className="card-body">
               <small className="text-muted p-t-30 db">User Id</small>
                <h6>{updateId}</h6>
                <small className="text-muted">Email address </small>
                <h6>{email}</h6> <small className="text-muted p-t-30 db">Company</small>
                <h6>{company}</h6> 
                
              </div>
            </div>
          </div>
        </CModalBody>
      </CModal>

      {/* Modals End */}

      {/* Header */}
      <div className="d-flex py-2 justify-content-between px-5 align-items-center">
        <CButton type="danger">
          Reporters <span className="badge badge-secondary bg-primary">{users ? count : '0'}</span>
        </CButton>

        {/* Search box */}
        <form className="d-flex flex-grow-1 mx-2" role="search">
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
            className="form-control me-2"
            type="search"
            placeholder="Search by first or Last Name"
            aria-label="Search"
          />
        </form>
        <CButton onClick={() => setShow(!show)}>Add +</CButton>
      </div>

      {/* Table */}
      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardBody>
              <br />

              <CTable className="mb-0 border" align="middle" hover responsive>
                <CTableHead color="light">
                  <CTableRow>
                    <CTableHeaderCell>id</CTableHeaderCell>
                    <CTableHeaderCell>First Name</CTableHeaderCell>
                    <CTableHeaderCell>Last Name</CTableHeaderCell>
                    <CTableHeaderCell>Email</CTableHeaderCell>
                    <CTableHeaderCell>Company</CTableHeaderCell>
                    <CTableHeaderCell>Actions</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                {/* Table body */}
                <CTableBody>
                  {/* Mapping over fetched data  */}
                  {users == null
                    ? <div className="spinner-border d-flex justify-content-center " role="status">
                        <span className="sr-only"></span>
                      </div>
                    : users.map((user, index) => (
                        <CTableRow className="reporter-row" key={user.id}>
                          <CTableDataCell className="user-id">{user.id}</CTableDataCell>
                          <CTableDataCell className="first-name">{user.first_name}</CTableDataCell>
                          <CTableDataCell className="last-name">{user.last_name}</CTableDataCell>
                          <CTableDataCell className="email">{user.email}</CTableDataCell>
                          <CTableDataCell className="company">{user.company}</CTableDataCell>
                          <CTableDataCell>
                            <div className="d-flex gap-2">
                              <button  id={user.id} onClick={handleInfo} className="btn btn-dark">
                                info
                              </button>
                              <button id={user.id} onClick={handleEdit} className="btn btn-primary text-white">
                                Edit
                              </button>
                              <button id={user.id} className="btn btn-danger text-white" onClick={handleDelete}>
                                Delete
                              </button>
                            </div>
                          </CTableDataCell>
                          {/* Add more table cells as needed */}
                        </CTableRow>
                      ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* Pagination */}
      <div className="d-flex text-center col-lg-7 container flex-row-reverse justify-content-between">
        <a className={`btn btn-md ${!next ? 'disabled' : 'd-block'} btn-primary mx-2`} onClick={handleNext}>
          Next
        </a>
        <a className={`btn btn-md ${!prev ? 'disabled' : 'd-block'} btn-primary mx-2`} onClick={handlePrev}>
          Previous
        </a>
      </div>
    </>
  )
}

export default Reporters
