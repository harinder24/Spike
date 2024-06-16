import axios from "axios";
import serverLink from "../../serverlink";

export async function isMineActive(token) {
  try {
    const response = await axios.get(serverLink + "/mines/ismineactive", {
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
      serverLink + "/mines/getbetdata",
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
export async function setMineBet(token, mines, amount) {
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
      serverLink + "/mines/setminebet",
      { date, mines, amount, timeStamp },
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
export async function mineClick(token, id, index) {
  try {
    const response = await axios.post(
      serverLink + "/mines/mineclick",
      { id, index },
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
export async function checkoutApi(token, id) {
  try {
    const response = await axios.post(
      serverLink + "/mines/checkout",
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