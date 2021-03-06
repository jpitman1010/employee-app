
export const initState = {
    data: [],
    loading: true
}



export const reducer = (state, action)=>{
    if(action.type == "ADD_DATA"){
        return {
                        // destructure state/spread it out by ...state
        ...state,
        data: action.payload
        }
    }
    if(action.type === "SET_LOADING"){
        return {
        ...state,
        loading: action.payload
        }
    }
    return state
}