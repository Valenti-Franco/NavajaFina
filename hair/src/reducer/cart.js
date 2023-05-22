export const CartInitialState = [];
export const cartReducer = (state, action) =>{
    const { type: actionType, payload: actionPayload } = action
    
    switch(actionType){
    case 'ADD_TO_CART':{
        const { _id } = actionPayload
        const productInCart = state.findIndex(item => item._id === _id)
    
        if(productInCart >= 0) {
            const newState = structuredClone(state)
            newState[productInCart].quantity += 1
            return newState
        }
        

        // no esta en el carrito
        return[
            ...state,
            {
                ...actionPayload, // product
                quantity: 1
            }
        ]
    }
    case 'REMOVE_TO_CART':{
        const { _id } = actionPayload
        const productInCart = state.findIndex(item => item._id === _id)
    
        if(state[productInCart].quantity > 1) {
            const newState = structuredClone(state)
            newState[productInCart].quantity -= 1
            return newState
        }
        

        // no esta en el carrito
        return state.filter(item => item._id !== _id)
    

    }
    case 'REMOVE_FROM_CART':{
        const { _id } = actionPayload
        return state.filter(item => item._id !== _id)
        
    }
    case 'CLEAR_CART':{
        return CartInitialState

    }

    return state
    }
}