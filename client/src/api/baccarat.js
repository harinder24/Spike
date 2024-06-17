import axios from "axios";
import serverLink from "../../serverlink";

export async function baccaratApi(token,bets ) {
    const timeStamp = Date.now();
    const currentdate = new Date(timeStamp);
    let hours = currentdate.getHours();
    const minutes = currentdate.getMinutes().toString().padStart(2, "0");
    const period = hours >= 12 ? "PM" : "AM";
  
    hours = hours % 12;
    hours = hours ? hours : 12;
  
    const time = hours + ":" + minutes + " " + period;
    const date =
      currentdate.getDate() +
      "/" +
      currentdate.getMonth() +
      1 +
      "/" +
      currentdate.getFullYear() +
      " " +
      time;
    try {
      const response = await axios.post(
        serverLink + "/baccarat/baccaratbet",
        { date, timeStamp ,bets},
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      const userData = response.data;
  
      return userData;
    } catch (error) {
      console.log(error);
    }
  }