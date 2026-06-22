import api from "./api";

const boxService = {

  // GET /api/v1/boxes — fetch all box types
  getBoxes: async () => {
    const response = await api.get("/boxes");
    return response.data;
  },

  // GET /api/v1/boxes/:id — fetch single box
  getBoxById: async (id) => {
    const response = await api.get(`/boxes/${id}`);
    return response.data;
  },

};

export default boxService;