// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

/*export default function handler(req, res) {
  res.status(200).json({ name: 'John Doe' })
}*/
import axios from "axios";
let jwt = null;

const getJWT = () => {
  jwt = jwt ?? localStorage.getItem("jwt");

  return jwt;
};
const api = axios.create({
  baseURL: "http://localhost:3002",
  transformRequest: [
    (data, headers) => {
      headers.authentication = getJWT();
      headers.post["Content-Type"] = "application/json";
      headers.get["Content-Type"] = "application/json";
      headers.delete["Content-Type"] = "application/json";
      headers.put["Content-Type"] = "application/json";

      return JSON.stringify(data);
    },
  ],
});

export default api;
