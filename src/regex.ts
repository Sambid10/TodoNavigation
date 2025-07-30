
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const passwordRegex= /^(?=.*[A-Z]).{6,}$/


 export const isValidEmail = (val: string) => emailRegex.test(val);
 export  const isValidPass = (val: string) => passwordRegex.test(val);