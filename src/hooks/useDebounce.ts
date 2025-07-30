import { useEffect, useState } from "react";

export function useDebounce<T>(value:T,delay:200){
    const [debouncedVal,setDebouncedValue]=useState<T>()
    useEffect(()=>{
        setTimeout(()=>{
            setDebouncedValue(value)
        },delay)
    },[debouncedVal,value,delay])
    return debouncedVal
}