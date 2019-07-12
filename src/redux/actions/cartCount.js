import Axios from "axios"

export const cartCount = (int) => {
    return (dispatch) => {
        Axios.get('http://localhost:2000' + '/users?username=' + int).then((res)=>{
            Axios.get('http://localhost:2000' + '/cart?idUser=' + res.data[0].id).then((res) => {
                dispatch({
                    type : 'CART_COUNT',
                    payload : res.data.length
                })
            })
        })
    }
}

export const resetCount = () => {
    return{
        type : 'RESET_COUNT'
    }
}