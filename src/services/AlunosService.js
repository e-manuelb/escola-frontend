import axios from "./Connection";

export const AlunosService = {
  async getAll() {
    return await axios.get("/alunos/getAll");
  },
  async getByID(id) {
    return await axios.get(`/alunos/get/${id}`);
  },
  async updateAluno(id, data) {
    return await axios.put(`/alunos/update/${id}`, data);
  },
  async deleteAluno(id) {
    return await axios.delete(`/alunos/delete/${id}`);
  },
  async postAluno(data) {
    return await axios.post("/alunos/add", data);
  },
  async searchAluno(nomeTurma) {
    return await axios.get(`/alunos/search/${nomeTurma}`);
  },
};
