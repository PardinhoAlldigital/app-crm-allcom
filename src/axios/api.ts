import axios from "axios";

export const api = axios.create({
  baseURL: `https://api-crmallcom.sandboxallcom.com/api/v1`,
  headers: {
    "Content-Type": "application/json",
    "application-key": "2"
  },
});
