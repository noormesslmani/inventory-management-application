import { editProfile, changePassowrd } from "../api/profile";
import { toast } from 'react-toastify';
export const handleSaveChanges=async (setIsloading, user,base64,setUser, setIsReadOnly)=>{
    setIsloading(true);
    console.log('hi');
        try{
            const res=await editProfile({
                ...(user.first_name!== JSON.parse(localStorage.getItem('user')).first_name  && { first_name: user.first_name}),
                ...(user.last_name!== JSON.parse(localStorage.getItem('user')).last_name  && { last_name: user.last_name}),
                ...(base64 && { base64_image: base64}),
            });
            setUser(res.data);
            localStorage.setItem('user', JSON.stringify(res.data));
            toast.success('Profile successfully updated');
        }
        catch (error){

            toast.error(error.response.data.message);
        }
        finally{
            setIsloading(false);
            setIsReadOnly(true);
        }
}
export const handleChangePassword=async(setIsloading, setIsReadOnly, data)=>{
    console.log(data)
    try{
        await changePassowrd(data);
        
        toast.success('Password successfully changed');
    }
    catch (error){
        toast.error(error.response.data.message);
    }
    finally{
        setIsloading(false);
        setIsReadOnly(true);
    }
}