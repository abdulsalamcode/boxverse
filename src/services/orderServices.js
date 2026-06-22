import api from "./api";

const orderService = {

  // POST /api/v1/orders — place a new order
  placeOrder: async ({ boxId, productIds, shippingDetails }) => {
    const response = await api.post("/orders", {
      box_id:           boxId,
      product_ids:      productIds,
      shipping_details: shippingDetails,
    });
    return response.data;
  },

  // GET /api/v1/orders/:id — fetch order by ID
  getOrderById: async (id) => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },

  // GET /api/v1/orders — fetch all orders of logged in user
  getUserOrders: async () => {
    const response = await api.get("/orders");
    return response.data;
  },

};

export default orderService;