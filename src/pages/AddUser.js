import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { addUser, getSingleUser } from '../redux/actions';
import './Style.css'


const AddUser = () => {

  const [state, setState] = useState({
    name: "",
    email: "",
    contact: ""
  })
  const [error, setError] = useState("")

  const { name, email, contact } = state;
  const navigate = useNavigate();
  const dispach = useDispatch();

  const handleInputChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  }


  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name || !email || !contact) {
      setError("Plz Fill the Complete Data");
    } else {
      dispach(addUser(state))
      navigate("/")
      setError("")
    }
  }

  return (
    <>
      <Box className='adduser-container'
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField onChange={handleInputChange} id="standard-basic" label="NAME" variant="standard" value={name} type="text" name='name' />
        <TextField onChange={handleInputChange} id="standard-basic" label="EMAIL" variant="standard" value={email} type="email" name='email' />
        <TextField onChange={handleInputChange} id="standard-basic" label="CONTACT" variant="standard" value={contact} type="text" name='contact' />
      </Box>
      {error && <span className='err-msg' >{error}</span>}
      <div className='submit'>
        <Button onClick={handleSubmit} variant="contained" color="primary">Submit</Button>
        <Link className='link' to='/'>
          <Button style={{ marginLeft: "5px" }} variant="contained" color="primary">Go Back</Button>
        </Link>
      </div>

    </>
  )
}

export default AddUser