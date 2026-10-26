import axios from "axios";

const api = axios.create({
  baseURL: "https://cautious-pancake-jj577qv7rw452j5qg-3000.app.github.dev/api",
});

export default api;
