import axios from "axios";
import serverLink from "../../serverlink";
export async function isBlackjackActive(token) {
    try {
      const response = await axios.get(serverLink + "/blackjack/isblackjackactive", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      const userData = response.data;
  
      return userData;
    } catch (error) {
      console.log(error);
    }
  }
  export async function getBetData(token, id) {
    try {
      const response = await axios.post(
        serverLink + "/blackjack/getbetdata",
        { id },
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
  export async function setBlackjackBet(token, amount) {
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
        serverLink + "/blackjack/setblackjackbet",
        { date,  amount, timeStamp },
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

  export async function blackjackHit(token, id) {
    try {
      const response = await axios.post(
        serverLink + "/blackjack/hitblackjack",
        { id },
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
  export async function blackjackStand(token, id) {
    try {
      const response = await axios.post(
        serverLink + "/blackjack/standblackjack",
        { id },
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