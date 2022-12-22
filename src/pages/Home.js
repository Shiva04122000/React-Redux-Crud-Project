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
import ButtonGroup from '@mui/material/ButtonGroup';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Navigate, Link, useNavigate } from 'react-router-dom';


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
    // hide last border
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
                This is React Redux CRUD Operation Project
            </div>
            <div>
                <Link className='link' to='/add-user'>
                    <Button className='addUser' style={{ marginLeft: "9rem", marginTop: "1rem", marginBottom: "1rem" }} variant="contained" color="primary">Add User</Button>
                </Link>
            </div>

            <TableContainer component={Paper} style={{ width: "95%", margin: "auto" }}>
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
                                <Stack style={{ marginTop: "8px" }}
                                    direction="row"
                                    spacing={2}
                                >
                                    <Button onClick={() => navigate(`./edit-user/${user.id}`)} style={{ marginRight: "1px" }} variant="contained" color="primary">Edit</Button>
                                    <Button onClick={() => handleDelete(user.id)} variant="contained" color="error">Delete</Button>
                                </Stack>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default Home