import { Button,Alert, FormControl, Grid, InputAdornment, InputLabel, MenuItem, Select, TextField, Typography} from '@mui/material';
import { Box, styled } from '@mui/system';
import axios from 'axios';
import React from 'react';
import {Link} from "react-router-dom"
import useAuth from "../AdminParts/../../../others/useAuthContext"
import {useHistory} from 'react-router-dom'
import {CopyToClipboard} from 'react-copy-to-clipboard'
import Whatsapp from '@mui/icons-material/WhatsApp'
import Update from "../AdminParts/../../../components/Update.js"
import Facebook from '@mui/icons-material/Facebook'
import Twitter from '@mui/icons-material/Twitter'

// styled component for font awesome icon
const Icon = styled('i')(({ theme }) => ({
    color: '#00000099',
    fontSize: '22px', margin: '5px 10px 5px 0'
}));


const AddNewCar = ({ setProcessStatus, showSnackbar }) => {
    const[status,setStatus]=React.useState("")
    const[failed,setFailed]=React.useState("")
    const history=useHistory()
  const {currentUser,logout}=useAuth()
  const[error,setError]=React.useState('')
  async function handleLogout(){
   setError('')
   try{
await logout()
history.push("/login")
   }
   catch(e){
    setFailed(`failed to logout!`)
   }

  }

 
   

    const [values, setValues] = React.useState({}) // form values state
    const [carType, setCarType] = React.useState('')
    const[user,setUser]=React.useState(currentUser.email)
   
     // form car type state
    const [fuel, setFuel] = React.useState('') // form fuel type state
    // handle changing value in form
const[userName,setUserName]=React.useState('')
const[location,setLocation]=React.useState('')
const[mobile,setMobile]=React.useState('')
const[description,setDescription]=React.useState('')
const[facebook,setFacebook]=React.useState('')
const[twitter,setTwitter]=React.useState('')
const[instagram,setInstagram]=React.useState('')
const[id,setId]=React.useState('')
const[copied,setCopied]=React.useState(false)
    
      React.useEffect(()=>{
        const getUser= async ()=>{
  try{
const {data}= await axios.post(`https://milesmotors.onrender.com/auth/login`,{
  email:currentUser.email
})


setUserName(data.name)
setId(data._id)
setLocation(data.location)
setDescription(data.description)
setFacebook(data.facebook)
setTwitter(data.twitter)
setInstagram(data.instagram)
setMobile(data.mobile)
  }

  catch(e){
setUserName(`error fetching user`)
  }
 }
 getUser()
setUser(currentUser.email)
    },[currentUser.email])
    const handleValueChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    }
    // add new car in database
  
    const handleSubmit = (event) => {
        const newCarInfo = { ...values, carType, fuel,user }
        axios.post('https://milesmotors.onrender.com/car', newCarInfo)
            .then(({ data }) => {
                if (data.code===1) {
                  setStatus(`car added succesfully`)
                    showSnackbar()
                    event.target.reset()
                }
            })
            .catch(err => {
          setStatus(`car not added, there was an error`)
                showSnackbar() // show notification popup containing status
            })
        event.preventDefault()
    }
    return (
        <Box>
            {error&& <Alert severity="error">{error}</Alert>}
             {status && <Alert severity="success">{status}</Alert>}
              {failed&& <Alert severity="error">{failed}</Alert>}
                        <Typography variant="h5" align="center" color="black" >{` Welcome back ${userName}`}</Typography>
                         <Typography sx={{fontStyle:'italic'}} variant="h6" align="center" color="primary" fontWeight="bold" >Share your profile, let others discover you</Typography>
                        {userName?

                      <Typography sx={{cursor:'pointer',fontStyle:'italic',display:'flex', flexDirection:'row',justifyContent:'center'}} variant="h4" align="center" color="primary" >
                        <CopyToClipboard style={{marginLeft:'10px',marginRight:'10px'}} text={`https://carhub-xi.vercel.app/seller/${id}`} onCopy={()=>{
return setCopied(true)
                        }} ><Typography sx={{color:'blue',marginTop:{xs:'0',md:'12px'}}}>Copy </Typography>
                        </CopyToClipboard>
                        <a   style={{marginLeft:'10px',marginRight:'10px'}} href={`whatsapp://send?text=Hello,check out our cars at https://carhub-xi.vercel.app/seller/${id} `}><Whatsapp/></a>
                        
                          <a  style={{marginLeft:'10px',marginRight:'10px'}} href={`https://www.facebook.com/share.php?u=https://carhub-xi.vercel.app/seller/${id} `}><Facebook/></a>
                           <a  style={{marginLeft:'10px',marginRight:'10px'}} href={`https://www.twitter.com/share?url=https://carhub-xi.vercel.app/seller/${id} `}><Twitter/></a>
                        </Typography>:null}
                          <Typography variant="h6" align="center" color="black" fontWeight="bold">
                            {copied?<span style={{color:'red'}}>Copied!</span>:null}
                          </Typography>

                                  <Typography variant="h6" align="center" color="red" fontWeight="bold">Update Profile</Typography>

                                     <Typography variant="h6" align="center" color="red" fontWeight="bold">
                                        <Update id={id} name={userName} mobile={mobile} twitter={twitter} facebook={facebook} instagram={instagram} location={location} description={description}/>
                                     </Typography>
            <Typography variant="h6" align="center" color="black" fontWeight="bold">Add New Car In Shop</Typography>
            <Box maxWidth="sm" sx={{ my: 4, mx: 'auto' }}>

                {/* new car information form */}
                <form onSubmit={handleSubmit}>
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
                                           <MenuItem value={'Nissan'}>Ford</MenuItem>
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
                            {/* car image url */}
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <Icon className="fas fa-image"></Icon>
                                <TextField fullWidth label="Img URL"
                                    variant="standard" required type="url"
                                    onChange={handleValueChange('carImg')} />
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            {/* car image url */}
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <Icon className="fas fa-image"></Icon>
                                <TextField fullWidth label="Image 2 URL"
                                    variant="standard" required type="url"
                                    onChange={handleValueChange('image2')} />
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            {/* car image url */}
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <Icon className="fas fa-image"></Icon>
                                <TextField fullWidth label="Image 3 URL"
                                    variant="standard" required type="url"
                                    onChange={handleValueChange('image3')} />
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            {/* car image url */}
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <Icon className="fas fa-image"></Icon>
                                <TextField fullWidth label="Image 4 URL"
                                    variant="standard" required type="url"
                                    onChange={handleValueChange('image4')} />
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            {/* car image url */}
                            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
                                <Icon className="fas fa-image"></Icon>
                                <TextField fullWidth label="Image 5 URL"
                                    variant="standard" required type="url"
                                    onChange={handleValueChange('image5')} />
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            {/* car description textarea */}
                            <TextField fullWidth multiline
                                rows={4} sx={{ my: 2 }}
                                label="Description" variant="outlined"
                                type="text" required
                                onChange={handleValueChange('description')} />
                        </Grid>
                        <Grid item xs={12} sx={{ textAlign: 'right' }}>
                            <Button type="submit" variant="outlined"
                                >Add to Database</Button>
                                {/**disabled={currentUser?.email !== 'kariukiamschel9@gmail.com'} */}
                        </Grid>

                         <Grid item xs={12} sx={{ textAlign: 'right' }}>
                       <Typography component={Link} to="/manage">
                        Manage All cars
                       </Typography>
                        </Grid>
                         <Grid item xs={12} sx={{ textAlign: 'right' }}>
                       <Typography
                       onClick={handleLogout}
                        component={Button} >
                       Logout
                       </Typography>
                        </Grid>


                    </Grid>
                </form>
            </Box>

        </Box>
    );
};

export default AddNewCar;