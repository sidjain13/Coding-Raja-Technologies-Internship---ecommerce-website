const INIT_STATE = {
    carts:[]           //empty carts to store multiple add to cart items 
}

export const cartreducer = (state=INIT_STATE,action)=>{
    switch(action.type){
        case "ADD_CART":        //here we are using type coming from action.js
            return{
                ...state,       //agar spread operator use nahi kiya to purani value bulta jayega aur nayi leta jayega 
                carts:[...state.carts,action.payload]
            }

        default : 
            return state
    }
}