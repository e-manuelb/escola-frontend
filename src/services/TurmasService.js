import axios from "./Connection";

export const TurmasService = {
  async getAll() {
    return await axios.get("/turmas/getAll");
  },
  async getByID(id) {
    return await axios.get(`/turmas/get/${id}`);
  },
  async updateTurma(id, data) {
    return await axios.put(`/turmas/update/${id}`, data);
  },
  async deleteTurma(id) {
    return await axios.delete(`/turmas/delete/${id}`);
  },
  async postTurma(data) {
    return await axios.post("/turmas/add", data);
  },
  async searchTurma(nomeTurma) {
    return await axios.get(`/turmas/search/${nomeTurma}`);
  },
  async turmasByEscolas(id) {
    return await axios.get(`/turmas/byEscola/${id}`);
  },
};
