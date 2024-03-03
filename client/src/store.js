// used in redux 


import {createStore} from 'redux'
import rootred from './redux/reducers/main'

const store=createStore(
    rootred         //combine reducer aa jayega
)

export default store;