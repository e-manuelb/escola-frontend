import axios from "./Connection";

export const UsersService = {
  async login(data) {
    return await axios.post("/login", data);
  },
  async postUser(data) {
    return await axios.post("/users/add", data);
  },
  async updateUser(id, data) {
    return await axios.put(`/users/update/${id}`, data);
  },
  async me() {
    return await axios.get("/users/me");
  },
};
