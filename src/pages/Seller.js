import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import LoadingSpinner from '../Common/LoadingSpinner/LoadingSpinner';
import SingleCar from './SingleCar/SingleCar';
import {   useSelector} from 'react-redux'
import {useParams } from "react-router-dom";

const Seller = ({ dataAmount }) => {
      const { userId } = useParams();
      const[userEmail,setUserEmail]=React.useState('')
      const [user,setUser]=React.useState('')
      
const {search}= useSelector((state)=>state.query)
const {type}= useSelector((state)=>state.type)

    const [cars, setCars] = useState(null);
useEffect(()=>{
const getUser= async ()=>{
    try{
const {data}= await axios.get(`https://milesmotors.onrender.com/seller/${userId}`)
setUserEmail(data.email)
setUser(data.name)
    }
    catch(e){

    }
}
getUser()
},[userId])

    useEffect(() => {
         const FetchCars = async () => {
            
        const {data} =  await axios.get(`https://milesmotors.onrender.com/cars/all?user=${userEmail}`,{
            params:{
                name:search,
                brand:type
            }
        })
        setCars(data)
        console.log("dataNumber", data)
    }
        FetchCars()   
    }, [dataAmount,search,type,userEmail])


    return (!cars ? <LoadingSpinner style={{ padding: '100px 0' }} /> :
        <Box sx={{ maxWidth: 'xl', mx: 'auto', p: 2, justifyContent: "center" }}>
            <Typography variant="h4" align="center" color="primary" fontWeight="bold" mb={6}>Popular Cars by {user}</Typography>
            <Grid container rowSpacing={4} columnSpacing={{ xs: 1, sm: 2, md: 3, xl: 4 }}
                sx={{ justifyContent: 'center' }}>
                {
                    cars.map(carInfo => <SingleCar carInfo={carInfo} key={carInfo.carID} />)
                }
            </Grid>
        </Box>
    );
};

export default Seller;