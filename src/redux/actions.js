import axios from 'axios';
import * as types from './actionType';

const getUsers=(users)=>({
    type:types.GET_USERS,
    payload:users,
})

const userDeleted=()=>({
    type:types.DELETE_USERS,
})

const userAdded=()=>({
    type:types.ADD_USERS,
})

const userUpdated=()=>({
    type:types.UPDATE_USER,
})

const getUser=(user)=>({
    type:types.GET_SINGLE_USER,
    payload:user,
})

export const loadUsers=()=>{
    return function (dispach){
        axios.get('https://63a30166471b38b20602fcf9.mockapi.io/redux-crud')
        .then((res)=>{
            console.log('response',res)
            dispach(getUsers(res.data));
        })
        .catch((error)=>console.log("api error",error))
    }
}

export const deleteUsers=(id)=>{
    return function (dispach){
        axios.delete(`https://63a30166471b38b20602fcf9.mockapi.io/redux-crud/${id}`)
        .then((res)=>{
            console.log('delete',res)
            dispach(userDeleted());
            dispach(loadUsers())
        })
        .catch((error)=>console.log("api error",error))
    }
}

export const getSingleUser=(id)=>{
    return function (dispach){
        axios.get(`https://63a30166471b38b20602fcf9.mockapi.io/redux-crud/${id}`)
        .then((res)=>{
            console.log('get Single User',res)
            dispach(getUser(res.data));
        })
        .catch((error)=>console.log("api error",error))
    }
}

export const addUser=(user)=>{
    return function (dispach){
        axios.post(`https://63a30166471b38b20602fcf9.mockapi.io/redux-crud/`,user)
        .then((res)=>{
            console.log('Add User',res)
            dispach(userAdded());
            dispach(loadUsers())
        })
        .catch((error)=>console.log("api error",error))
    }
}

export const updateUser=(user,id)=>{
    return function (dispach){
        axios.put(`https://63a30166471b38b20602fcf9.mockapi.io/redux-crud/${id}`,user)
        .then((res)=>{
            console.log('Add User',res)
            dispach(userUpdated());
            dispach(loadUsers());
        })
        .catch((error)=>console.log("api error",error))
    }
}