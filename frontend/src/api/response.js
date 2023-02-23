import axios from 'axios';

export default async function response(config, usedToken='token')
{
    const token = localStorage.getItem("token");
    const payLoad={...config, headers: {Authorization: `Bearer ${token}` }}
    try{
        const res = await axios(payLoad)
        return res.data;
      }
    catch (error) {
      throw error;
    }
}