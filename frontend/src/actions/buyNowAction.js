import axios from "axios";
export const buyNowItem = (id, quantity) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/v1/product/${id}`);
  
    dispatch({
      type: 'BUY_NOW_ITEM',
      payload: {
        product: data.product._id,
        name: data.product.name,
        price: data.product.price,
        image: data.product.images[0].url,
        stock: data.product.Stock,
        quantity,
      },
    });
    localStorage.setItem("buyNowItem", JSON.stringify(getState().buyNow.buyNowItem));
  };

  
  export const updateBuyNow = (newValue) => {
    return {
      type: 'UPDATE_BUY_NOW',
      payload: newValue
    };
  };