import axios from "./Connection";

export const EscolasService = {
  async getAll() {
    return await axios.get("/escolas/getAll");
  },
  async getByID(id) {
    return await axios.get(`/escolas/get/${id}`);
  },
  async updateEscola(id, data) {
    return await axios.put(`/escolas/update/${id}`, data);
  },
  async deleteEscola(id) {
    return await axios.delete(`/escolas/delete/${id}`);
  },
  async postEscola(data) {
    return await axios.post("/escolas/add", data);
  },
  async searchEscola(nomeEscola) {
    return await axios.get(`/escolas/search/${nomeEscola}`);
  },
};
