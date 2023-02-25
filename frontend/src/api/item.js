import response from "./response";

const baseURL= process.env.REACT_APP_BASE_URL;

export async function getItemsByProductId(product_id, page){
    const config = {
        method: "get",
        params:{page},
        url:`${baseURL}/items/${product_id}`,
      }
    return response(config)
}

export async function updateAnItem(data, id){
  const config = {
      method: "patch",
      data,
      url:`${baseURL}/item/${id}`,
    }
  return response(config)
}

export async function deleteAnitem(id){
  const config = {
      method: "delete",
      url:`${baseURL}/item/${id}`,
    }
  return response(config)
}

export async function addNewItems( data){
  const config = {
      method: "post",
      data,
      url:`${baseURL}/items`,
    }
  return response(config)
}