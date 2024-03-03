// jaise hi add to cart pe click hoga waise hi data item pe aayega ab yaha se reducer.js me kam shuru hoga

export const ADD = (item)=>{
    return {
        type:"ADD_CART",
        payload:item
    }
}