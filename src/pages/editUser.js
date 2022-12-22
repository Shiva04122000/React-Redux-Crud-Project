import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { getSingleUser, updateUser } from '../redux/actions';


const EditUser = () => {

    const [state, setState] = useState({
        name: "",
        email: "",
        contact: ""
    })
    let { id } = useParams();

    const { name, email, contact } = state;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.data)

    const handleInputChange = (e) => {
        let { name, value } = e.target;
        setState({ ...state, [name]: value });
    }

    useEffect(() => {
        dispatch(getSingleUser(id))
        console.log("getuser")
    }, [])

    useEffect(() => {
        if (user) {
            setState({ ...user })
        }
    }, [user])

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(updateUser(state, id))
        navigate("/")
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
            <div className='submit'>
                <Button onClick={handleSubmit} variant="contained" color="primary">Update</Button>
                <Link className='link' to='/'>
                    <Button style={{ marginLeft: "5px" }} variant="contained" color="primary">Go Back</Button>
                </Link>
            </div>

        </>
    )
}

export default EditUser