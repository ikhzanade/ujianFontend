import axios from 'axios'
import { ApiUrl } from './supports/ApiURl'
import cookie from 'universal-cookie'

const objCookie = new cookie()
export const onLogin = (paramUsername,password) => { 
    return(dispatch)=>{
        // INI UNTUK MENGUBAH LOADING MENJADI TRUE
        dispatch({
            type: 'LOADING',
        })

        // GET DATA DARI FAKE API JSON SERVER
        axios.get(ApiUrl + '/users?username='+paramUsername+'&password='+password)
        
        // KALO BERHASIL NGE GET, DIA MASUK THEN
        .then((res) => {
            console.log(res)

        // IF USERNAME DAN PASSWORD SESUAI MAKA RES.DATA ADA ISINYA
            if(res.data.length > 0){
                console.log(res)
                dispatch(
                    {
                        type : 'LOGIN_SUCCESS',
                        payload : res.data
                        // {
                        //      username : res.data[0].username,
                        //      role : res.data[0].role,
                        //      id : res.data[0].id
                        // }
                    }
                )
            }else{
                dispatch({
                    type : 'USER_NOT_FOUND',
                    payload : ['','Username not Found']
                })
            }
            
        })
        .catch((err) => {
            dispatch({
                type : 'SYSTEM_ERROR'
            })
        })
    }
   
}



export const keepLogin = (cookie) => {
    return(dispatch) => {
        axios.get(ApiUrl + '/users',{params : {username : cookie}})
        .then((res) => {
            if(res.data.length > 0){
                dispatch({
                    type : 'LOGIN_SUCCESS',
                    payload : res.data
                        // {
                        //      username : res.data[0].username,
                        //      role : res.data[0].role
                        // }
                })
            }
        })
        .catch((err) => console.log(err))
    }
} 

export const cookieChecked = () => {
    return {
        type : 'COOKIE_CHECKED'
    }
}

export const resetUser = () => {
    return {
        type : 'RESET_USER'
    }
}

export const userRegister = (a,b,c,d) => { // userRegister('fikri')
    return(dispatch)=>{
        dispatch({
            type : 'LOADING'
        })
        var newData = {username : a, password : b, email : c, phone : d}
        // Mengecek Username availablity

        axios.get(ApiUrl +'/users?username=' + a)
        .then((res) => {
            if(res.data.length > 0){
                dispatch({
                    type : 'USERNAME_NOT_AVAILABLE'
                })
            }
            else{
                axios.post(ApiUrl +'/users',newData)
                .then((res) => dispatch({
                    type : 'LOGIN_SUCCESS',
                    //Mengirim Payload dalam bentuk Object
                    //payload : { username : newData.username, id : res.data.id, email : c} 
                    payload : a
                },
                    // Parameter Ketiga agar cookie bisa diakses di semua komponen
                    objCookie.set('userData',a,{path : '/'}),
                ))
                .catch((err) => console.log(err))
            }
        })
        .catch((err) => {
            dispatch({
                type : 'SYSTEM_ERROR'
            })
        })
    }
}

export const loginWithGoogle = (email) => {
    return(dispatch) => {
        axios.get(ApiUrl + '/users?username=' + email)
        .then((res) => {
            if(res.data.length > 0){
                dispatch({
                    type :'LOGIN_SUCCESS',
                    payload : res.data
                },
                    objCookie.set('userData',email,{path : '/'})
                )
            }else{
                axios.post(ApiUrl + '/users', {username : email,role :'user'})
                .then((res) => {
                    dispatch({
                        type : 'LOGIN_SUCCESS',
                        payload : res.data
                    },
                        objCookie.set('userData',email,{path : '/'})
                    )
                })
                .catch((err) => {
                    console.log(err)
                })
            }
        })
        .catch((err)=>{
            console.log(err)
        })
    }
}



