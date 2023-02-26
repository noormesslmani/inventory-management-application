import { toast } from 'react-toastify';
import { createAccount, login } from '../api/auth';

export const userLogin=async (setIsLoading, data, navigate)=>{
    setIsLoading(true);
      try{
        const res=await login(data);
        localStorage.setItem('user', JSON.stringify(res.user));
        localStorage.setItem('token', res.authorisation.token);
        navigate('/products');
      }
      catch (error){
    
        toast.error(error.response.data.message);
      }
      finally{
        setIsLoading(false);
      }
}

export const registerUser=async (setIsLoading, data, setFormType)=>{
    setIsLoading(true)
    try{
        await createAccount(data);
        toast.success('Account successfully created! You can now login');;
    }
    catch (error){
        toast.error(error.response.data.message);
    }
    finally{
        setIsLoading(false);
        setFormType('login')
    }
}