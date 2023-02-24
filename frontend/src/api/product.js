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

export async function searchProductsByType(type){
    const config = {
        method: "get",
        params:{type},
        url:`${baseURL}/searched-products`,
      }
    return response(config)
}

