import { Button,Alert, FormControl, Grid, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography} from '@mui/material';
import { Box, styled } from '@mui/system';
import axios from 'axios';
import React from 'react';

import useAuth from "../AdminParts/../../../others/useAuthContext"

import LoadingSpinner from '../../Common/LoadingSpinner/LoadingSpinner';


// styled component for font awesome icon
const Icon = styled('i')(({ theme }) => ({
    color: '#00000099',
    fontSize: '22px', margin: '5px 10px 5px 0'
}));





const AddNewCar = ({ setProcessStatus }) => {
   const[filesEnough,setFilesEnough]=React.useState(false)
    const[status,setStatus]=React.useState("")

  const {currentUser}=useAuth()
 
 const buttonRef=React.useRef()

 
   

    const [values, setValues] = React.useState({}) // form values state
    const [carType, setCarType] = React.useState('')
    const[user,setUser]=React.useState(currentUser.email)
    const[carImg,setCarImage]=React.useState("")
     const[image2,setImage2]=React.useState("")
     const[image3,setImage3]=React.useState("")
     const[image4,setImage4]=React.useState("")
     const[image5,setImage5]=React.useState("")
   const[largeImage,setLargeImage]=React.useState("")
  const[message,setMessage]=React.useState("")
     // form car type state
    const [fuel, setFuel] = React.useState("") // form fuel type state
    // handle changing value in form
const[userName,setUserName]=React.useState("")



    
      React.useEffect(()=>{
        const getUser= async ()=>{
  try{
const {data}= await axios.post(`https://milesmotors.onrender.com/auth/login`,{
  email:currentUser.email
})

console.log(data)
setUserName(data.name)



  }

  catch(e){
return null
  }
 }
 getUser()
setUser(currentUser.email)
    },[currentUser.email])
    const handleValueChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    }
    // add new car in database
  
    const handleSubmit =  (event) => {

        const newCarInfo = { ...values, carType, fuel,user,carImg,image2,image3,image4,image5}
 //buttonRef.current.setAttribute("disabled",true)
  setMessage("adding car ....")
 axios.post('https://milesmotors.onrender.com/car', newCarInfo)
         .then(({ data }) => {
                if (data.code===1) {
                    setMessage('')
                    //buttonRef.current.setAttribute("disabled",false)
                 
                  setStatus(`car added succesfully`)
                  // showSnackbar()
                    event.target.reset()
                }
            })
            .catch(err => {
          setStatus(`${err}`)
               // showSnackbar() // show notification popup containing status
            })
        event.preventDefault()
    }
    return (
      
 <Box >
           
            
             
                      {userName ?<Typography sx={{marginTop:{xs:'100px',sm:'100px'}}} variant="h6" align="center" color="black" >{` Welcome ${userName}`}</Typography>:null}
                        
                       

                    
                                  

                                  
           {userName ? <Typography variant="h6" align="center" color="black" fontWeight="bold">Add New Car In Shop</Typography>: <Typography variant="h6" align="center" color="black" fontWeight="bold">Just a moment ...</Typography>}
            <Box maxWidth="sm" sx={{ my: 4, mx: 'auto' }}>

                {/* new car information form */}
             {userName ? <form onSubmit={handleSubmit}>
                    <Grid container rowSpacing={3.5} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                        <Grid item xs={12}>
                            {/* car name */}
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <Icon className="fas fa-file-signature"></Icon>
                                <TextField fullWidth label="Car Name"
                                    variant="standard" required type="text"
                                    onChange={handleValueChange('carName')} />
                            </Box>
                        </Grid>
                        <Grid item xs={6} md={4}>
                            {/* car body color */}
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <Icon className="fas fa-palette"></Icon>
                                <TextField fullWidth label="Body Color"
                                    variant="standard" required type="text"
                                    onChange={handleValueChange('color')} />
                            </Box>
                        </Grid>
                         <Grid item xs={6} md={4}>
                            {/* car body color */}
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <Icon className="fas fa-palette"></Icon>
                                <TextField fullWidth label="Unique ID"
                                    variant="standard" required type="text"
                                    onChange={handleValueChange('carID')} />
                            </Box>
                        </Grid>
                        <Grid item xs={6} md={4}>
                            {/* car type selector */}
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <Icon className="fas fa-car"></Icon>
                                <FormControl variant="standard" fullWidth>
                                    <InputLabel>Car Brand</InputLabel>
                                    <Select fullWidth required
                                        value={carType}
                                        onChange={(e) => setCarType(e.target.value)}
                                    >
                                        <MenuItem value={'Toyota'}>Toyota</MenuItem>
                                        <MenuItem value={'Subaru'}>Subaru</MenuItem>
                                        <MenuItem value={'Audi'}>Audi</MenuItem>
                                        <MenuItem value={'Mazda'}>Mazda</MenuItem>
                                        <MenuItem value={'Ford'}>Ford</MenuItem>
                                           <MenuItem value={'Nissan'}>Nissan</MenuItem>
                                            <MenuItem value={'Suzuki'}>Suzuki</MenuItem>
                                            <MenuItem value={"Volkswagen"}>Volks Wagen</MenuItem>
                                            <MenuItem value={"Honda"}>Honda</MenuItem>
                                             <MenuItem value={"Mitsubishi"}>Mitsubishi</MenuItem>
                                             <MenuItem value={"Porsche"}>Porsche</MenuItem>
                                             <MenuItem value={"Renault"}>Renault</MenuItem>
                                              <MenuItem value={"Saab"}>Saab</MenuItem>

                                            <MenuItem value={"Tata"}>Tata</MenuItem>
                                             <MenuItem value={"Volvo"}>Volvo</MenuItem>
                                             <MenuItem value={"Bmw"}>BMW</MenuItem>
<MenuItem value={"Chevrolet"}>Chevrolet</MenuItem>
  <MenuItem value={"Hino"}>Hino</MenuItem>

  <MenuItem value={"Hyundai"}>Hyundai</MenuItem>
    <MenuItem value={"Infiniti"}>Infiniti</MenuItem>
       <MenuItem value={"Isuzu"}>Isuzu</MenuItem>
          <MenuItem value={"Jaguar"}>Jaguar</MenuItem>
           <MenuItem value={"Jeep"}>Jeep</MenuItem>
            <MenuItem value={"LandRover"}>LandRover</MenuItem>

            <MenuItem value={"Lexus"}>Lexus</MenuItem>
            <MenuItem value={"Man"}>Man</MenuItem>
            <MenuItem value={"Mercedez-Amg"}>Mercedez Amg</MenuItem>
             <MenuItem value={"Mercedez-Benz"}>Mercedez Benz</MenuItem>
             <MenuItem value={"Mini"}>Mini</MenuItem>
<MenuItem value={"Peugeot"}>Peugeot</MenuItem>

                                    </Select>
                                </FormControl>
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            {/* car mileage input */}
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <Icon className="fas fa-road"></Icon>
                                <TextField fullWidth required label="Mileage"
                                    InputProps={{
                                        endAdornment: <InputAdornment position="start">km</InputAdornment>,
                                    }}
                                    variant="standard" type="number"
                                    onChange={handleValueChange('mileage')}
                                />
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            {/* car transmission status */}
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <Icon className="fas fa-tachometer-alt"></Icon>
                                <TextField fullWidth label="Transmission"
                                    variant="standard" required text="text"
                                    onChange={handleValueChange('transmission')} />
                            </Box>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            {/* car engine info */}
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <Icon className="fas fa-cogs"></Icon>
                                <TextField fullWidth label="Engine"
                                    variant="standard" required type="text"
                                    onChange={handleValueChange('engine')} />
                            </Box>
                        </Grid>
                        <Grid item xs={5} md={4}>
                            {/* car fuel type input */}
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <Icon className="fas fa-gas-pump"></Icon>
                                <FormControl variant="standard" fullWidth>
                                    <InputLabel>Fuel</InputLabel>
                                    <Select fullWidth required
                                        value={fuel}
                                        onChange={(e) => setFuel(e.target.value)}
                                    >
                                        <MenuItem value={'gasoline'}>Gasoline</MenuItem>
                                        <MenuItem value={'diesel'}>Diesel</MenuItem>
                                        <MenuItem value={'bio-diesel'}>Bio-Diesel</MenuItem>
                                        <MenuItem value={'ethanol'}>Ethanol</MenuItem>
                                        <MenuItem value={'petrol'}>Petrol</MenuItem>
                                    </Select>
                                </FormControl>
                            </Box>
                        </Grid>
                        <Grid item xs={7} md={8}>
                            {/* car price in us dollar */}
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <Icon className="fas fa-dollar-sign"></Icon>
                                <TextField fullWidth label="Price"
                                    variant="standard" required type="number"
                                    onChange={handleValueChange('price')} />
                            </Box>
                        </Grid>
                       
                       
                       
                        <Grid item xs={12}>

<Grid item xs={12}>
                            {/* car image url */}
                            
                        </Grid>
                       

                            {/* car description textarea */}
                            <TextField fullWidth multiline
                                rows={4} sx={{ my: 2 }}
                                label="Description" variant="outlined"
                                type="text" required
                                onChange={handleValueChange('description')} />
                        </Grid>
                         <Grid item xs={12} sx={{ textAlign: 'right' }}>
                         <label for="images">Choose upto 5 pictures</label>
                            <input type="file" multiple required name="images" id="images" accept='image/png, image/jpeg'
                            onChange={
                                (e)=>{
                                    const files=e.target?.files
                                    if(files){
                                        if(files.length<5){
                                    return;
                                        }
                                        
                                        for(let i=0;i<files.length;i++){
                                            if(files[i].size>2800000){
                                             return   setLargeImage(`images that exceed 2.8mbs are not allowed,choose again!`)

                                            }
                                            setFilesEnough(true)
                                            const reader=new FileReader()
                                            reader.addEventListener('load',(readerEvent)=>{

                                                //make an img element
                                                let img=document.createElement('img');
                                                   img.src = readerEvent.target.result;
                                                   //here we are going to resize our images to smaller pixel dimensions using the canvas Api


                                               img.onload=function (){

                                               
                                             
                                                const canvas=document.createElement('canvas')
                                                 let ctx = canvas.getContext("2d");
             ctx.drawImage(img, 0, 0); 
                                                         
                                                         
                let MAX_WIDTH = 300;
                let MAX_HEIGHT = 200;
                let width = img.width;
                let height = img.height;

                 if (width > height) {
                    if (width > MAX_WIDTH) {
                        height *= MAX_WIDTH / width;
                        width = MAX_WIDTH;
                    }
                } else {
                    if (height > MAX_HEIGHT) {
                        width *= MAX_HEIGHT / height;
                        height = MAX_HEIGHT;
                    }
                }
                canvas.width = width;
                canvas.height = height;
                      ctx = canvas.getContext("2d");
             ctx.drawImage(img, 0, 0, width, height);
             //here we convert the image to 1/2 times the original resolution

            const  data=canvas.toDataURL(files[i].type)

            console.log( `the base 64 url for our image is given by ${data}`)

//const data=readerEvent.target.result
// we then set the relevant states to the relevant base 64 encoded strings

if(i===0){
    setCarImage(data)
}
if(i===1){
    setImage2(data)
}
if(i===2){
    setImage3(data)
}
if(i===3){
    setImage4(data)
}
if(i===4){
    setImage5(data)
}
                                               }
                                            })
                                            reader.readAsDataURL(files[i])
                                        }
                                    }

                                }
                            }
                            />
                               
                        </Grid>

                        <Grid item xs={12} sx={{ textAlign: 'right' }}>
                            <Button ref={buttonRef}  disabled={!filesEnough & !largeImage } type="submit" variant="outlined"
                                >Add to Database</Button>
                           <div>{message}</div>
                                {!filesEnough &!largeImage &&<Alert severity="error" >Please choose upto 5 photos</Alert>}
                                {largeImage && <Alert severity="error">{largeImage}</Alert>}
                                {status && <Alert severity="success">{status}</Alert>}
                               
                        </Grid>

                        
                        


                    </Grid>
                </form>:<div style={{marginTop:'200px',marginLeft:'100px'}}> <LoadingSpinner/></div>}
            </Box>

           

            </Box>

       
      
    );
      
};

export default AddNewCar;


