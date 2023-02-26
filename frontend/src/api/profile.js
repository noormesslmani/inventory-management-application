import response from "./response";

const baseURL= process.env.REACT_APP_BASE_URL;

export async function editProfile(data){
    const config = {
        method: "patch",
        data,
        url:`${baseURL}/profile`,
      }
    return response(config)
}

export async function changePassowrd(data){
    const config = {
        method: "patch",
        data,
        url:`${baseURL}/password`,
      }
    return response(config)
}