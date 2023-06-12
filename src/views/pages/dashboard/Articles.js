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
  const [url, setUrl] = useState(`http://127.0.0.1:8000/blog_service/article/?search_key=`)
  const [count, setCount] = useState(0)
  const [next, setNext] = useState(null)
  const [prev, setPrev] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [updating, setUpdating] = useState(false)
  const [updateId, setUpdateId] = useState(false)
  const [users, setUsers] = useState(null)
  const [headline, setHeadline] = useState('')
  const [details, setDetails] = useState('')
  const [date, setDate] = useState('')

  const[reporterId, setReporterId] = useState(null)
  const [reporters, setReporters] = useState([])

  const [publishers, setPublishers]= useState([])
  const [selectedPublisher, setSelectedPublisher] = useState([])
  
  const [show, setShow] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
 

  //   Handling Modal
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const fetchData = async (url) => {
    try {
      if (searchQuery != ''){
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
    fetchReporters()
   
  }, [searchQuery])

  const fetchReporters  = async () => {
    
    try {
      
      const response = await axios.get('http://127.0.0.1:8000/blog_service/reporter/')
      setReporters(response.data.results)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }
  useEffect(() => {
    fetchData(url)
    setFormSubmitted(false)
  }, [formSubmitted])

  const handleSubmit = async (event) => {
    event.preventDefault()
    const newUser = {
      headline: headline,
      details: details,
      reporter: reporterId,
      publisher: [
        17, 12
      ],
    }

    if (updating) {
      try {
        
        await axios.put(`http://127.0.0.1:8000/blog_service/article/${updateId}`, newUser)
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
        await axios.post('http://127.0.0.1:8000/blog_service/article/', newUser)
        showNoti('successNotification')
      } catch (error) {
        console.error('Error adding user:', error)
        alert('BAD REQUEST')
      }
    }
    handleClose()
    setFormSubmitted(true)
    setHeadline('')
    setDetails('')

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
      const response = await axios.delete(`http://127.0.0.1:8000/blog_service/article/${userId}`)
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

    const headline = event.target.closest('.article-row').querySelector('.headline').textContent
    const details = event.target.closest('.article-row').querySelector('.details').textContent
    const reporter_id = event.target.closest('.article-row').querySelector('.reporter-id').textContent

    setHeadline(headline)
    setDetails(details)
    setUpdating(true)
    setUpdateId(userId)
    setReporterId(reporter_id)
    // setCompany(company)
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
      <CModal visible={show} onClose={() => setShow(false)}>
        <CModalHeader onClose={() => setShow(false)}>
          <CModalTitle>Article Submission</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <form className="col-lg-8 mx-auto needs-validation" onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="headline" className="form-label">
                Headline
              </label>
              <input
                type="text"
                className="form-control"
                id="headline"
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                required
                placeholder="The is your headline"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">
               Details
              </label>
              <textarea value={details}  onChange={(e)=>setDetails(e.target.value)} className="form-control" placeholder='Write Your Article here' id="exampleFormControlTextarea1" rows="3"></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">
               Reporter ID
              </label>
              <input
                type="number"
                className="form-control"
                id="reporter"
                value={reporterId}
                onChange={(e) => setReporterId(e.target.value)}
                required
                placeholder="1"
              />
            </div>
            <button type="submit" className="btn btn-lg btn-success text-white">
              Submit
            </button>
          </form>
        </CModalBody>
      </CModal>
      {/* Header */}
      <div className="d-flex py-2 justify-content-between px-5">
      <CButton  >Articles<span className="badge badge-secondary bg-primary">{users ? count : '0'}</span> </CButton>

        {/* Search box */}
        <form className="d-flex flex-grow-1 mx-2" role="search">
          <input  onChange={(e)=>setSearchQuery(e.target.value)} value={searchQuery}  className="form-control me-2" type="search" placeholder="Search by first or Last Name" aria-label="Search" />
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
                    <CTableHeaderCell>Headline</CTableHeaderCell>
                    <CTableHeaderCell>Description</CTableHeaderCell>
                    <CTableHeaderCell>Reporter id</CTableHeaderCell>
                    <CTableHeaderCell>Written by </CTableHeaderCell>
                    <CTableHeaderCell>Created at</CTableHeaderCell>
                    <CTableHeaderCell>Actions</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {users == null
                    ? 'Loading'
                    : users.map((user, index) => (
                        <CTableRow className="article-row" key={user.id}>
                          <CTableDataCell className="user-id">{user.id}</CTableDataCell>
                          <CTableDataCell className="headline">{user.headline}</CTableDataCell>
                          <CTableDataCell className="details">{user.details}</CTableDataCell>
                          <CTableDataCell className="reporter-id">{user.reporter.id}</CTableDataCell>                          
                          <CTableDataCell className="reporter-name">{user.reporter.first_name}</CTableDataCell>                          
                          <CTableDataCell className="created">{user.created_at.substring(0,10)}</CTableDataCell>                        
                          <CTableDataCell>
                            <div className="d-flex gap-2">
                              <button className="btn btn-dark">info</button>
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
