import axios from "axios";
import serverLink from "../../serverlink";

export async function getUserTokenData(token) {
  try {
    const response = await axios.get(serverLink + "/user/getusertokendata", {
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
export async function getUserVipProgress(token) {
  try {
    const response = await axios.get(serverLink + "/user/getuservipprogress", {
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
export async function getUserStats(token) {
  try {
    const response = await axios.get(serverLink + "/user/getuserstats", {
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
export async function getStripeKey(token) {
  try {
    const response = await axios.get(serverLink + "/user/getstripekey", {
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
export async function walletHandler(token) {
  try {
    const response = await axios.get(serverLink + "/user/wallet", {
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
export async function notificationHandler(token) {
  try {
    const response = await axios.get(serverLink + "/user/notification", {
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
export async function notificationReadHandler(token) {

  try {
    const response = await axios.get(serverLink + "/user/notificationread", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const userData = response.data;
console.log(userData);
    return userData;
  } catch (error) {
    console.log(error);
  }
}
export async function paymentApi(token, amount, id) {
  const timeStamp = Date.now()
  try {
    const response = await axios.post(
      serverLink + "/user/payment",
      { amount, id,timeStamp },
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
export async function withdrawApi(token, amount) {
  const timeStamp = Date.now()
  try {
    const response = await axios.post(
      serverLink + "/user/withdraw",
      { amount,timeStamp },
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
export async function vaultHandler(token) {
  try {
    const response = await axios.get(serverLink + "/user/vault", {
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
export async function addVault(token, amount) {
  try {
    const response = await axios.post(
      serverLink + "/user/addvault",
      { amount },
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
export async function withdrawVault(token, amount, password) {
  try {
    const response = await axios.post(
      serverLink + "/user/withdrawvault",
      { amount, password },
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

