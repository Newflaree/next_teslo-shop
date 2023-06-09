export const cartReducer = ( state, action ) => {
  switch ( action.type ) {
    case '[CART] - Load Cart From Cookies | storage':
      return {
        ...state,
        isLoaded: true,
        cart: [ ...action.payload ]
      }

    case '[CART] - Update Products In Cart':
      return {
        ...state,
        cart: [ ...action.payload ]
      }

    case '[CART] - Update Cart Quantity':
      return {
        ...state,
        cart: state.cart.map( product => {
          if ( product._id !== action.payload._id ) return product;
          if ( product.size !== action.payload.size ) return product;

          return action.payload;
        })
      }

    case '[CART] - Remove Product In Cart':
      return {
        ...state,
        cart: [ ...action.payload ]
      }

    case '[CART] - Update Order Summary':
      return {
        ...state,
        ...action.payload
      }

    case '[CART] - Update Shipping Address':
    case '[CART] - Load Addres From Cookies | storage':
      return {
        ...state,
        shippingAddress: action.payload
      }

    default: 
      return state;
  }
};
