const baseUri = "/api";

async function readApiResponse(response) {
  if (!response.ok) throw Error("Not OK");
  const json = await response.json();
  return json;
}

async function callApi(path, query, init) {
  const builtInit = init || {};
  const jwt = getJwt();
  if (jwt) {
    builtInit.headers = {
      "Authorization": "Bearer " + jwt,
      ...builtInit.headers
    }
  }
  let builtUri = baseUri + path;
  if (query) {
    const params = new URLSearchParams(query);
    builtUri += "?" + params;
  }
  const res = await fetch(builtUri, builtInit);
  return await readApiResponse(res);
}

function getApi(path, query, init) {
  return callApi(path, query, {
    method: 'GET',
    ...init
  })
}

function postApi(path, body, query, init) {
  const builtInit = {
    method: 'POST',
    ...init
  };
  if (body) {
    builtInit.headers = {
      'Content-Type': 'application/json',
      ...builtInit.headers
    }
    builtInit.body = JSON.stringify(body);
  }
  return callApi(path, query, builtInit);
}

const jwtStorageKey = "JWT";
const jwtStorage = sessionStorage;
export function getJwt() {
  return jwtStorage.getItem(jwtStorageKey);
}

export async function login(username, password) {
  const result = await postApi("/admin/login", {
    username,
    password
  });
  jwtStorage.setItem(jwtStorageKey, result.jwt);
}

export function logout() {
  jwtStorage.removeItem(jwtStorageKey);
}

export function hasLogedIn() {
  return getJwt() !== null;
}

function processGoods(g) {
  g.onShelfTime = new Date(g.onShelfTime);
  processGoodsDescription(g.currentDescription);
  return g;
}

function processGoodsDescription(d) {
  d.createdTime = new Date(d.createdTime);
  d.reviewedTime = new Date(d.reviewedTime);
  return d;
}

export async function getAllGoods() {
  const goods = await getApi("/goods");
  return goods.map(g => processGoods(g));
}

export async function getAllNeedReviewGoods(query) {
  const result = await getApi("/goods/needReview", query);
  result.content.forEach(d => processGoodsDescription(d));
  return result;
}

export async function getAllChangeRequestedGoods(query) {
  const result = await getApi("/goods/changeRequested", query);
  result.content.forEach(d => processGoodsDescription(d));
  return result;
}

export function goodsReviewApprove(descriptionId) {
  return postApi(`/goods/${descriptionId}/review/approve`);
}

export function goodsReviewRequestChange(descriptionId, comments) {
  return postApi(`/goods/${descriptionId}/review/requestChange`, {
    comments
  });
}
