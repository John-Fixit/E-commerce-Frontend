import { createStore } from "redux";

const reducerFunc = (state={query : ''}, action)=>{
    if(action.type==='CHANGEVALUE'){
        return {
            query: action.payload
        }
    }
    return state
}

const store = createStore(reducerFunc)

export default store