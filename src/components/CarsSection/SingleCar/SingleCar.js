import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { NavLink } from "react-router-dom";
import axios from "axios"
import {Link} from 'react-router-dom'



const SingleCar = ({ carInfo }) => {
 const[userId,setUserId]=React.useState('')
  const {
    _id,
   
    carImg,
    carName,
   
    transmission,
    fuel,
   
    price,
   
    user
  } = carInfo;
const [userName,setUserName]=React.useState('')
React.useEffect(()=>{
 const getUser= async ()=>{
  try{
const {data}= await axios.post(`https://milesmotors.onrender.com/auth/login`,{
  email:user
})


setUserName(data.name)
setUserId(data._id)
  }

  catch(e){
setUserName(`error fetching user`)
  }
 }
 getUser()
},[user])
  // Numbers over 1000 to separated by commas
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <Grid item xs={12} sm={6} md={4} lg={3} sx={{display: "flex", justifyContent: "center"}}>
      <NavLink to={`/cars/details/${_id}`}>
        <Box sx={{ display: "flex", flexDirection: "column"}}>
        <Card sx={{ maxWidth: 300, minWidth: 300}}>
          <CardActionArea>

            <img src={carImg} height='150' width="100%" alt={carName}/>
           
            <CardContent>
              <Typography gutterBottom variant="h5" component="div" color="red">
               Ksh {numberWithCommas(price)}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                fontWeight={700}
              >
                {carName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <span style={{ backgroundColor: "#EEF0F8" }}>
                  {transmission}
                </span>{" "}
                | <span style={{ backgroundColor: "#EEF0F8" }}>{fuel}</span>
              </Typography>
               <Typography
               component={Link}
               to={`/seller/${userId}`}
                variant="p"
                color="red"
              
                fontWeight={700}
              >
             click to view more about  {userName}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              Details
            </Button>
          </CardActions>
        </Card>
        </Box>
      </NavLink>
    </Grid>
  );
};

export default SingleCar;
