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

    const [error, setError] = useState("")

    const { name, email, contact } = state;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.data)
    const res = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var re = /^(\d{3})[- ]?(\d{3})[- ]?(\d{4})$/;

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
        if (!res.test(email.toLowerCase()) || isNaN(contact) || !re.test(contact) || !isNaN(name)) {
            setError("Plz Fill the correct Data");
        } else {
            dispatch(updateUser(state, id))
            navigate("/")
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
                <Button onClick={handleSubmit} variant="contained" color="primary">Update</Button>
                <Link className='link' to='/'>
                    <Button style={{ marginLeft: "5px" }} variant="contained" color="primary">Go Back</Button>
                </Link>
            </div>

        </>
    )
}

export default EditUser