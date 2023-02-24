import response from "./response";

const baseURL= process.env.REACT_APP_BASE_URL;

export async function getProductsByPage(page){
    const config = {
        method: "get",
        params:{page},
        url:`${baseURL}/products`,
      }
    return response(config)
}

