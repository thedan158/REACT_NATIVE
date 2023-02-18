import { getAPIs } from "./Apis";
import customAxios from "./AxiosInterceptors";

const host = "https://a4ae-116-110-40-131.ap.ngrok.io";
export function getAPIActionJSON(
  type,
  data,
  params = "",
  addparams = "",
  onSuccess = () => {},
  onError = () => {}
) {
  const api = getAPIs[type];
  //getAPIs['login']
  //name: "login",
  //path: "/api/auth/login",
  //method: "POST"
  //https://foody-uit.herokuapp.com/api/auth/login

  return (dispatch, getState) => {
    dispatch({ type: "loading.start" });
    customAxios({
      method: api.method, //POST
      url: host + api.path + addparams,
      params: params,
      data: data,
    })
      .then(function (response) {
        dispatch({ type: "loading.success" });
        // if (response.headers["aenx-token"]) {
        //   localStorage.setItem("aenx-token", response.headers["aenx-token"]);
        // }
        // if (response.headers["aenx-renew-token"]) {
        //   localStorage.setItem(
        //     "aenx-renew-token",
        //     response.headers["aenx-renew-token"]
        //   );
        // }
        console.log(type, response.data);
        if (response.status === 200) {
          dispatch({
            type: `${type}.reply`, /// login.reply
            data: response.data,
            headers: response.headers,
          });
        }
        onSuccess(response.data);
      })
      .catch((e) => {
        dispatch({ type: "loading.success" });
        onError(e);
        console.log(e);
      });
  };
}
export async function getStatelessAPI(
  type,
  data,
  headers,
  params = {},
  addparams = ""
) {
  const api = getAPIs[type];
  try {
    const res = await customAxios({
      method: api.method,
      url: host + api.path + addparams,
      params: params,
      data: data,
      headers: headers,
    });
    const responseData = res.data;
    console.log(type, responseData);
    return responseData;
  } catch (error) {
    if (error) {
      // Error Handler
      console.log(error);
    }
  }
}
