import React, { useEffect } from 'react'
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import './Style.css'
import { deleteUsers, loadUsers } from '../redux/actions';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));


const Home = () => {

    let dispach = useDispatch();
    const { users } = useSelector((state) => state.data);
    const navigate = useNavigate()

    useEffect(() => {
        dispach(loadUsers())
    }, [])

    const handleDelete = (id) => {
        dispach(deleteUsers(id))
    }

    return (
        <>
            <div className='heading'>
                <h2>Contact Diary </h2>
            </div>
            <div className='heading'>
                <p>( This is React Redux CRUD Operation Project)</p>
            </div>
            <div >
                <Link className='link add-user-btn' to='/add-user'>
                    <Button className='addUser' variant="contained" color="primary">Add User</Button>
                </Link>
            </div>
            <div className="table-container">
                <TableContainer component={Paper}  >
                    <Table sx={{ minWidth: 600 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Name</StyledTableCell>
                                <StyledTableCell align="centre">Email</StyledTableCell>
                                <StyledTableCell align="centre">Contact</StyledTableCell>
                                <StyledTableCell align="centre">Action</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users && users.map((user) => (
                                <StyledTableRow key={user.id}>
                                    <StyledTableCell component="th" scope="row">{user.name}</StyledTableCell>
                                    <StyledTableCell align="centre">{user.email}</StyledTableCell>
                                    <StyledTableCell align="centre">{user.contact}</StyledTableCell>
                                    <Stack style={{ marginTop: "8px" }} direction="row" spacing={2}>
                                        <Button onClick={() => navigate(`./edit-user/${user.id}`)} style={{ marginRight: "1px" }} variant="contained" color="primary">Edit</Button>
                                        <Button onClick={() => handleDelete(user.id)} variant="contained" color="error">Delete</Button>
                                    </Stack>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    )
}

export default Home