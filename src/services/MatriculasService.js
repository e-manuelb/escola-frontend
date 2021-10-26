import axios from "./Connection";

export const MatriculasService = {
  async getAll() {
    return await axios.get("/alunosDeTurmas/getAll");
  },
  async getByID(id) {
    return await axios.get(`/alunosDeTurmas/get/${id}`);
  },
  async updateMatricula(id, data) {
    return await axios.put(`/alunosDeTurmas/update/${id}`, data);
  },
  async deleteMatricula(id) {
    return await axios.delete(`/alunosDeTurmas/delete/${id}`);
  },
  async postMatricula(data) {
    return await axios.post("/alunosDeTurmas/add", data);
  },
  async searchMatricula(id) {
    return await axios.get(`/alunosDeTurmas/search/${id}`);
  },
};
