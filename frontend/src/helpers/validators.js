
export const validateSerialNumber=(serialNumbers)=>{
    for( let number of serialNumbers){
        if (number.length<10)
            return false;
    }
    return true
}