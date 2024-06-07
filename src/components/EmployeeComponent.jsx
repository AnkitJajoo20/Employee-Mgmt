import React, { useEffect, useState } from 'react'
import { createEmployee, updateEmployee, getEmployee } from '../services/EmployeeService'
import { useNavigate, useParams } from 'react-router-dom'

const EmployeeComponent = () => {

  const[firstName,setFirstName] = useState('')
  const[lastName,setLastName] = useState('')
  const[email,setEmail] = useState('')
  const[designation,setDesignation] = useState('')

  const {id} = useParams()

  const[error,setError] = useState({
    firstName: '',
    lastName: '',
    email: '',
    designation: ''
  })

  const navigator = useNavigate();

  useEffect(() => {

    if(id){
        getEmployee(id).then((response) => {
            setFirstName(response.data.firstName);
            setLastName(response.data.lastName);
            setEmail(response.data.email);
            setDesignation(response.data.designation);
    
        }).catch(error => {
            console.error(error);
        })
    }

}, [id])


function saveOrUpdateEmployee(e){
  e.preventDefault();

  if(validateForm()){

      const employee = {firstName, lastName, email, designation}
      console.log(employee)

      if(id){
          updateEmployee(id, employee).then((response) => {
              console.log(response.data);
              navigator('/employees');
          }).catch(error => {
              console.error(error);
          })
      } else {
          createEmployee(employee).then((response) => {
              console.log(response.data);
              navigator('/employees')
          }).catch(error => {
              console.error(error);
          })
      }
  }
}

  function validateForm(){
    let valid = true;

    const errorCopy = {... error}

    if(firstName.trim()){
      errorCopy.firstName = ''
    }else{
      errorCopy.firstName = "First Name Required Validate"
      valid=false
    }
    if(lastName.trim()){
      errorCopy.lastName = ''
    }else{
      errorCopy.lastName = "Last Name Required Validate"
      valid=false
    }
    if(email.trim()){
      errorCopy.email = ''
    }else{
      errorCopy.firstName = "Email Required Validate"
      valid=false
    }
    if(designation.trim()){
      errorCopy.designation = ''
    }else{
      errorCopy.designation = "Designation Required Validate"
      valid=false
    }
    setError(errorCopy);
    return valid;

  }

  function pageTitle(){
    if(id){
      return <h2 className='text-center'>Update Employee</h2>
    }else{
      return <h2 className='text-center'>Add Employee</h2>
    }

  }

  return (
    <div className='container'>
      <br/><br/>
      <div className='row'>
        <div className='card col-md-6 offset-md-3 offset-md-3'>
            {
              pageTitle()
            }
            <div className='card-body'>
              <form>
                <div className='form-group mb-2'>
                  <label className='form-label'>First Name:</label>
                  <input type='text' placeholder='Enter Employee First Name'
                    name='firstName'
                    value={firstName}
                    className={`form-control ${error.firstName ? 'is-valid': ''}`}
                    onChange={(e) => setFirstName(e.target.value)}
                  >
                  </input>
                  {error.firstName && <div className='invalid-feedback'>{error.firstName}</div>}
                </div>

                <div className='form-group mb-2'>
                  <label className='form-label'>Last Name:</label>
                  <input type='text' placeholder='Enter Employee Last Name'
                    name='lastName'
                    value={lastName}
                    className={`form-control ${error.lastName ? 'is-valid': ''}`}
                    onChange={(e) => setLastName(e.target.value)}
                  >
                  </input>
                  {error.lastName && <div className='invalid-feedback'>{error.lastName}</div>}
                </div>

                <div className='form-group mb-2'>
                  <label className='form-label'>Email:</label>
                  <input type='text' placeholder='Enter Employee Email Id'
                    name='email'
                    value={email}
                    className={`form-control ${error.email ? 'is-valid': ''}`}
                    onChange={(e) => setEmail(e.target.value)}
                  >
                  </input>
                  {error.email && <div className='invalid-feedback'>{error.email}</div>}
                </div>

                <div className='form-group mb-2'>
                  <label className='form-label'>Designation:</label>
                  <input type='text' placeholder='Enter Employee Designation'
                    name='designation'
                    value={designation}
                    className={`form-control ${error.designation ? 'is-valid': ''}`}
                    onChange={(e) => setDesignation(e.target.value)}
                  >
                  </input>
                  {error.designation && <div className='invalid-feedback'>{error.designation}</div>}
                </div>

                <button className='btn btn-success' onClick={saveOrUpdateEmployee}>SUBMIT</button>
              </form>

            </div>
        </div>

      </div>
    </div>
  )
}

export default EmployeeComponent