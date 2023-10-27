export const CartInitialState = JSON.parse(window.localStorage.getItem('cart')) || [];

export const updateLocalStorage = state => {
    window.localStorage.setItem('cart', JSON.stringify(state));

}
export const cartReducer = (state, action) => {
    const { type: actionType, payload: actionPayload } = action

    switch (actionType) {
        case 'ADD_TO_CART': {
            const { id } = actionPayload
            const productInCart = state.findIndex(item => item.id === id)

            if (productInCart >= 0) {
                const newState = structuredClone(state)
                newState[productInCart].quantity += 1
                updateLocalStorage(newState)
                return newState
            }


            // no esta en el carrito
            const newState = [
                ...state,
                {
                    ...actionPayload, // product
                    quantity: 1
                }
            ]
            updateLocalStorage(newState)
            return newState
        }
        case 'REMOVE_TO_CART': {
            const { id } = actionPayload
            const productInCart = state.findIndex(item => item.id === id)
            // console.log(productInCart)

            if (state[productInCart].quantity > 1) {
                const newState = structuredClone(state)
                newState[productInCart].quantity -= 1
                updateLocalStorage(newState)
                return newState
            }


            // no esta en el carrito
            const newState = state.filter(item => item.id !== id)
            updateLocalStorage(newState)
            return newState


        }
        case 'REMOVE_FROM_CART': {
            const { id } = actionPayload
            const newState = state.filter(item => item.id !== id)
            updateLocalStorage(newState)
            return newState

        }
        case 'CLEAR_CART': {

            const newState = []
            updateLocalStorage(newState)
            return newState
        }

    }
}