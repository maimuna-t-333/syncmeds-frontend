import { toast } from "sonner";
import { useAuthStore } from "@/lib/stores/auth-store";

const BASE_URL=process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api/v1';

export interface ApiResponse<T=unknown>{
    status:boolean;
    status_code:number;
    message:string;
    data:T;
    timestamp:string;
}

async function fetchWrapper<T=unknown>(
    endpoint:string,
    options:RequestInit={}
):Promise<T>{
    const {token, logout}=useAuthStore.getState();
    const headers: HeadersInit={
        'Content-Type':'application/json',
        ...(token ? { Authorization:`Bearer ${token}`}:{}),
        ...options.headers,
    };
const response=await fetch(`${BASE_URL}${endpoint}`,{
    ...options,
    headers,
});

if(response.status===401){
    toast.error('Session expired. Please log in again.');
    logout();
    throw new Error('Unauthorized');
}

const result:ApiResponse<T>=await response.json();
if(!result.status){
    throw new Error(result.message || 'An unexpected error occurred');
}
return result.data;
}

export const api={
    get:<T=unknown>(endpoint:string, options?:RequestInit)=>
        fetchWrapper<T>(endpoint,{...options,method:'GET'}),
    post:<T=unknown>(endpoint:string, body?:unknown, options?:RequestInit)=>
        fetchWrapper<T>(endpoint,{...options,method:'POST', body:JSON.stringify(body)}),
    patch:<T=unknown>(endpoint:string, body?:unknown, options?:RequestInit)=>
        fetchWrapper<T>(endpoint,{...options,method:'PATCH', body:JSON.stringify(body)}),
    delete:<T=unknown>(endpoint:string, options?:RequestInit)=>
        fetchWrapper<T>(endpoint,{...options,method:'DELETE'}),

}