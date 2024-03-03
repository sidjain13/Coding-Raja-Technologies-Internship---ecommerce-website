// used to toggle login - logout
// and based on concept of useReducer hook

export const initialState=null;

export const reducer=(state,action) =>{
    if(action.type==='USER'){
        return action.payload;      //here payload is simply true of false which we change in login and logout section 
    }
    return state;               //returning true or false
}