import { post } from "./xhr";

export function login(requestData) {
  return post("login", null, requestData);
}
