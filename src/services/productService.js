import api from "./api";

const productService = {

  // GET /api/v1/products — fetch all products
  getProducts: async (category = null) => {
    const params = {};
    if (category && category !== "all") {
      params.category = category;
    }
    const response = await api.get("/products", { params });
    return response.data;
  },

  // GET /api/v1/products/:id — fetch single product
  getProductById: async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

};

export default productService;