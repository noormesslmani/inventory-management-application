
export const validateSerialNumber=(serialNumbers)=>{
    for( let number of serialNumbers){
        if (number.length<10)
            return false;
    }
    return true
}

export const validatePassword=(password)=>{
    return password.length>=8;
}

export const validateName=(name)=>{
    return name.length>2;
}

export const validateConfirmPassword=(pass, confirmPass)=>{
    return pass===confirmPass;
}