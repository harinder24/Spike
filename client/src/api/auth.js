import axios from "axios"
import serverLink from "../../serverlink";
export async function registerApi(email, username, password){
    const timestamp = Date.now()
    const currentdate = new Date(timestamp)
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const date = monthNames[currentdate.getMonth()+1] + " " + currentdate.getDate() + "," + currentdate.getFullYear() 
 
    try {
        const response = await axios.post(serverLink + '/auth/register', {
          email :  email.toLowerCase(),
          username,
          password,
          date
        });
        return response.data;
      } catch (error) {
        console.log(error);
      }
}
export async function signInApi(email, password){


  try {
      const response = await axios.post(serverLink + '/auth/signin', {
        email :  email.toLowerCase(),
        password
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
}
export async function forgetPasswordApi(email){


  try {
      const response = await axios.post(serverLink + '/auth/forgetpassword', {
        email :  email.toLowerCase(),
     
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
}
export async function confirmPasswordApi(email, password, confirmPassword){


  try {
      const response = await axios.post(serverLink + '/auth/changepassword', {
        email :  email.toLowerCase(),
        password,
        confirmPassword
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
}
export async function otpValidation(email, otp){
  
    try {
        const response = await axios.post(serverLink + "/auth/otpvalidation", {
            email: email.toLowerCase(),
            otp,
          });
        return response.data;
      } catch (error) {
        console.log(error);
      }
}




export async function otpResend(email){
    try {
        await axios.post(serverLink + "/auth/otpresend", {
            email: email.toLowerCase(),
          });
    } catch (error) {
        
    }
    

}
