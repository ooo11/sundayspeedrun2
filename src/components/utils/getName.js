import axios from "../config/axiosConfig";

export default async function getName(userId) {
  const { data } = await axios.get(`${userId}`);

  return data.name;
}
