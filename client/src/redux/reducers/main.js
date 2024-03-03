// agar multiple reducer aa gaye to fir main.js me combine reducer karke store me save karana hoga 

import {combineReducers} from 'redux'
import { cartreducer } from './reducer'

const rootred=combineReducers({
    cartreducer         //yaha multiple reducer likh sakte hai 
})

export default rootred