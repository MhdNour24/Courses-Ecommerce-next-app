
const { default: axiosInstance } = require("./axiosInstant");




const addToCard=(payload)=>axiosInstance.post("/carts",payload)
const getUserCartItems= (email)=>axiosInstance.get(`/carts?populate[products][populate]=banner&filters[email][$eq]=${email}`)
const deleteCartItem= (documentId)=>axiosInstance.delete(`/carts/${documentId}`)

export default {
    addToCard,
    getUserCartItems,
    deleteCartItem
}