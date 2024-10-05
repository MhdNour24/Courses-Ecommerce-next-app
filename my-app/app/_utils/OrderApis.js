import axiosInstance from "./axiosInstant"

const createOrder=(data)=> axiosInstance.post("/orders",data)

export default {
    createOrder
}