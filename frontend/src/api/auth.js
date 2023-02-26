import response from "./response";

const baseURL= process.env.REACT_APP_BASE_URL;

export async function createAccount(data){
  console.log(data)
    const config = {
        method: "post",
        data,
        url:`${baseURL}/auth/register`,
      }
    return response(config)
}

export async function login(data){
    console.log(baseURL)
    const config = {
        method: "post",
        data,
        url:`${baseURL}/auth/login`,
      }
    return response(config)
}