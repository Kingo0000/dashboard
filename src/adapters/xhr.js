import process from "process";

const baseURL = process.env.API_BASE_URL;

export async function get(url, token) {
  const response = await fetch(baseURL + url, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  const result = await response.json();

  if (response.ok) {
    return result;
  }

  handleError(response, result);
}

export async function post(url, token, requestData) {
  const response = await fetch(baseURL + url, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestData),
  });

  const result = await response.json();

  if (response.ok) {
    return result;
  }

  handleError(response, result);
}

export async function put(url, token, requestData) {
  const response = await fetch(baseURL + url, {
    method: "PUT",
    headers: {
      Authorization: "Bearer " + token,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestData),
  });

  const result = await response.json();

  if (response.ok) {
    return result;
  }

  handleError(response, result);
}

export async function patch(url, token, requestData) {
  const response = await fetch(baseURL + url, {
    method: "PATCH",
    headers: {
      Authorization: "Bearer " + token,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestData),
  });

  const result = await response.json();

  if (response.ok) {
    return result;
  }

  handleError(response, result);
}

export async function remove(url, token) {
  const response = await fetch(baseURL + url, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  const result = await response.json();

  if (response.ok) {
    return result;
  }

  handleError(response, result);
}

function handleError(response, result) {
  const responseError = {
    type: "Error",
    message: result.message || "Something went wrong",
    data: result,
    status: response.status,
    statusText: response.statusText,
  };

  let error = new Error();
  error = { ...error, ...responseError };
  throw error;
}
