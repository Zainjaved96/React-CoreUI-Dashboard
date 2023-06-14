import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { AiFillDelete, AiTwotoneEdit, AiFillInfoCircle } from 'react-icons/ai'
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
import CIcon from '@coreui/icons-react'
import * as icon from '@coreui/icons'
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

  const [reporterId, setReporterId] = useState(null)
  const [reporterName, setReporterName] = useState('')

  const [availableReporters, setAvailableReporters] = useState([])
 

  const [publishers, setPublishers] = useState([])
  const [publisherNames, setPublisherNames] = useState('')

  // Modal states
  const [show, setShow] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)

  //   Handling Modal
  const handleClose = () => {
    setShow(false)
    setHeadline('')
    setDetails('')
    setReporterId('')
  }

  const handleShow = () => setShow(true)

  // Fetching articles data
  const fetchData = async (url) => {
    try {
      if (searchQuery != '') {
        url = url + searchQuery
      }

      const response = await axios.get(url)
      const available_reporters = await axios.get('http://127.0.0.1:8000/blog_service/reporter/')
      console.log(available_reporters)
      setAvailableReporters(available_reporters.data.results)
      console.log(availableReporters)
      setUsers(response.data.results.reverse())
      setCount(response.data.count)
      setNext(response.data.next)
      setPrev(response.data.previous)
      setIsLoading(false)
    } catch (error) {
    
      console.error('Error fetching data:', error)
    }
  }

  // this will update data after first rendering and
  // anytime there's a change in search query
  useEffect(() => {
    fetchData(url)
  }, [searchQuery])

  const handleSubmit = async (event) => {
    event.preventDefault()
    const newUser = {
      headline: headline,
      details: details,
      reporter: reporterId,
      publisher: publishers,
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
        fetchData(url)
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

  const handleDelete = async (id, event) => {
    const userId = id
    try {
      const response = await axios.delete(`http://127.0.0.1:8000/blog_service/article/${userId}`)
      showNoti('deleteNotification')
      fetchData(url)

      // Reset the form after successful submission
    } catch (error) {
      console.error('Error adding user:', error)
    }
  }

  const handleEdit = async (user) => {
    handleShow()
    // Fetching data to store in the form
    const publisherIds = user ? user.publisher.map((pub) => pub.id) : []

    setHeadline(user.headline)
    setDetails(user.details)
    setUpdating(true)
    setUpdateId(user.id)
    setReporterId(user.reporter.id)
    setPublishers(publisherIds)
    // setCompany(company)
  }

  const handleInfo = (user) => {
    setShowInfo(!showInfo)

    setHeadline(user.headline)
    setDetails(user.details)
    setUpdateId(user.userId)
    setReporterId(user.reporter.id)
    setReporterName(user.reporter.first_name)
    setPublisherNames(user.publisher)
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

  const handleInputChange = (index, event) => {
    const updatedPublishers = [...publishers]
    updatedPublishers[index] = event.target.value
    setPublishers(updatedPublishers)
  }

  const handleAddInput = () => {
    setPublishers([...publishers, null]) // Add an empty input to the state
  }

  const handleRemoveInput = (index) => {
    const updatedPublishers = [...publishers]
    updatedPublishers.splice(index, 1) // Remove input at the given index
    setPublishers(updatedPublishers)
  }

  const renderPublisherInputs = () => {
    return publishers.map((publisher, index) => (
      <div className=" d-flex py-2  gap-2 justify-content-between" key={index}>
        <input
          type="number"
          className="form-control"
          value={publisher}
          onChange={(event) => handleInputChange(index, event)}
        />
        <a className="btn btn-danger " onClick={() => handleRemoveInput(index)}>
          <AiFillDelete style={{ color: 'white' }} />
        </a>
      </div>
    ))
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

      {/* Table Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header onHide={handleClose}>
          <Modal.Title>Article Submission</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
              <textarea
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                className="form-control"
                placeholder="Write Your Article here"
                id="exampleFormControlTextarea1"
                rows="3"
              ></textarea>
            </div>
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">
                Reporter 
              </label>
              <select  value={reporterId} onChange={ (e) => setReporterId(e.target.value)} className="form-select" aria-label="Default select example">
                {availableReporters ?  availableReporters.map((reporter,index)=>{
                 return <option key={index} value={reporter.id}>{reporter.first_name}</option>
                }): 'No reporters'}
              </select>
             
            </div>
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">
                Publisher ID
              </label>
              {renderPublisherInputs()}
              <div>
                <a className="btn btn-primary " onClick={handleAddInput}>
                  <CIcon icon={icon.cilPlus} size="md" />
                </a>
              </div>
            </div>

            <button type="submit" className="btn btn-lg btn-success text-white">
              Submit
            </button>
          </form>
        </Modal.Body>
      </Modal>

      {/* Info Modal */}
      <CModal visible={showInfo} onClose={() => setShowInfo(false)}>
        <CModalHeader onClose={() => setShow(false)}></CModalHeader>
        <CModalBody>
          <div className="">
            <div className="card">
              <div className="card-body p-2 m-0">
                <h3 className="card-title px-2 text-center">{headline}</h3>
              </div>
              <div>
                <hr />
              </div>
              <div className="card-body">
                <small className="text-muted p-t-30 db">Article Body</small>
                <h6>{details}</h6>
                <small className="text-muted p-t-30 db">Article Id</small>
                <h6>{updateId}</h6>
                <small className="text-muted">Reporter:</small>
                <h6>{reporterName}</h6>
                <small className="text-muted">Publishers:</small>
                <h6>{publisherNames ? publisherNames.map((pub) => pub.name) : 'No Publisher Found'}</h6>
              </div>
            </div>
          </div>
        </CModalBody>
      </CModal>

      {/* Header */}
      <div className="d-flex py-2 justify-content-between px-5">
        <CButton>
          Articles<span className="badge badge-secondary bg-primary">{users ? count : '0'}</span>{' '}
        </CButton>

        {/* Search box */}
        <form className="d-flex flex-grow-1 mx-2" role="search">
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
            className="form-control me-2"
            type="search"
            placeholder="Search by word in headline"
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
                    <CTableHeaderCell>Headline</CTableHeaderCell>
                    <CTableHeaderCell>Description</CTableHeaderCell>
                    <CTableHeaderCell className="d-none">Reporter id</CTableHeaderCell>
                    <CTableHeaderCell>Written by </CTableHeaderCell>
                    <CTableHeaderCell>Published by </CTableHeaderCell>
                    <CTableHeaderCell className="d-none">Publishers id</CTableHeaderCell>
                    <CTableHeaderCell>Created at</CTableHeaderCell>
                    <CTableHeaderCell>Actions</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {users == null ? (
                    <div className="spinner-border d-flex justify-content-center " role="status">
                      <span className="sr-only"></span>
                    </div>
                  ) : (
                    users.map((user, index) => (
                      <CTableRow className="article-row" key={user.id}>
                        <CTableDataCell className="user-id">{user.id}</CTableDataCell>
                        <CTableDataCell className="headline">{user.headline}</CTableDataCell>
                        <CTableDataCell>{user.details.substring(0, 30)}...</CTableDataCell>
                        <CTableDataCell className="details d-none">{user.details}</CTableDataCell>
                        <CTableDataCell className="reporter-id d-none">{user.reporter.id}</CTableDataCell>
                        <CTableDataCell className="reporter-name">{user.reporter.first_name}</CTableDataCell>
                        <CTableDataCell className="publisher-name">
                          <div className="d-flex flex-column ">
                            {user.publisher.map((pub) => (
                              <div key={pub.id}>{`${pub.name} `}</div>
                            ))}
                          </div>
                        </CTableDataCell>
                        <CTableDataCell className="publisher-id d-none ">
                          {user.publisher.map((pub, index) => (
                            <div key={pub.id} className="pub-id">
                              {pub.id}
                            </div>
                          ))}
                        </CTableDataCell>
                        <CTableDataCell className="created">{user.created_at.substring(0, 10)}</CTableDataCell>
                        <CTableDataCell>
                          <div className="d-flex gap-2">
                            <a id={user.id} onClick={() => handleInfo(user)} className="btn btn-dark">
                              <AiFillInfoCircle size={25} style={{ color: 'white' }} />
                            </a>
                            <button
                              id={user.id}
                              onClick={() => handleEdit(user)}
                              className="btn btn-primary text-white"
                            >
                              <AiTwotoneEdit size={25} style={{ color: 'white' }} />
                            </button>
                            <button
                              id={user.id}
                              onClick={(evt) => handleDelete(user.id, evt)}
                              className="btn btn-light text-white"
                            >
                              <AiFillDelete size={25} style={{ color: 'red' }} />
                            </button>
                          </div>
                        </CTableDataCell>
                        {/* Add more table cells as needed */}
                      </CTableRow>
                    ))
                  )}
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
