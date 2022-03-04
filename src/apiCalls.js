
import axios from 'axios'

const baseurl = `http://localhost:5000`

// const baseurl = 'https://bootorganizer-server.herokuapp.com'
//store user first registration data
export const createuser = async ({ name, password, email, state, city, phoneno }) => {
    return axios.post(`${baseurl}/signin`, { name, password, email, state, city, phoneno }).then(res => res.data)
}


//user login process
export const validuserlogin = async ({ email, password }) => {
    return axios.post(`${baseurl}/userlogin`, { email, password }).then(res => res.data)
}

//admin login process
export const validadminlogin = async ({ email, password }) => {
    return axios.post(`${baseurl}/adminlogin`, { email, password }).then(res => res.data)
}

//forget password
export const forgotpassword = async ({ email, password }) => {
    return axios.put(`${baseurl}/forgotpassword`, { email, password }).then(res => res.data)
}

//create bootcamp
export const createbootcamp = async ({ name, price, company, organizer, organizer2, phone1, phone2, userlimit, orgdate, starttime, endtime }) => {
    return axios.post(`${baseurl}/addcamp`, { name, price, company, organizer, organizer2, phone1, phone2, userlimit, orgdate, starttime, endtime }).then(res => res.data)
}


//get user bootcamp
export const getuserhomepage = async ({ id }) => {
    return axios.get(`${baseurl}/${id}`).then(res => res.data)
}

//get bootcamp
export const getbootcamp = async () => {
    return axios.get(`${baseurl}/`).then(res => res.data)
}

//get bootcamp list for admin
export const admingetbootcamp = async ({ id }) => {
    return axios.get(`${baseurl}/adminhomepage/${id}`).then(res => res.data)
}


//admin retrive specific bootcamp
export const retirvespecificbootcamp = async ({ id }) => {
    return axios.get(`${baseurl}/bootcamp/${id}`).then(res => res.data)
}

//verify user transcation
export const verifytranscationdetails = async ({ email, id, name, bname }) => {
    return axios.put(`${baseurl}/bootcamp/${id}`, { email, name, bname }).then(res => res.data)
}

//register user complaint 
export const userhelpsupport = async ({ email, query, status }) => {
    return axios.post(`${baseurl}/support`, { email, query, status }).then(res => res.data)
}

//retrive complaint list
export const retrivecomplaints = async ({ id }) => {
    return axios.get(`${baseurl}/complaintlist/:${id}`).then(res => res.data)
}

//retrive complaint list
export const updatecomplaintstatus = async ({ id, email }) => {
    return axios.put(`${baseurl}/complaintlist/:${id}`, { id, email }).then(res => res.data)
}



//get bootcamp
export const updateuserlist = async ({ id, userdata, status, bootcampdata }) => {
    return axios.put(`${baseurl}/`, { id, userdata, status, bootcampdata }).then(res => res.data)
}

