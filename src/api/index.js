const baseUri = "/api";

async function readApiResponse(response) {
  if (!response.ok) throw Error("Not OK");
  const json = await response.json();
  return json;
}

async function callApi(path, init) {
  const builtInit = init || {};
  if (jwt) {
    builtInit.headers = {
      "Authorization": "Bearer " + jwt,
      ...builtInit.headers
    }
  }
  const res = await fetch(baseUri + path, builtInit);
  return await readApiResponse(res);
}

function getApi(path, init) {
  return callApi(path, {
    method: 'GET',
    ...init
  })
}

function postApi(path, body, init) {
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
  return callApi(path, builtInit);
}

let jwt = null;

export async function login(username, password) {
  const result = await postApi("/admin/login", {
    username,
    password
  });
  jwt = result.jwt;
}

export function logout() {
  jwt = null;
}

function processGoods(g) {
  g.onShelfTime = new Date(g.onShelfTime);
  processGoodsDescription(g.currentDescription);
  return g;
}

function processGoodsDescription(d) {
  d.createdTime = new Date(d.createdTime);
  return d;
}

export async function getAllGoods() {
  const goods = await getApi("/goods");
  return goods.map(g => processGoods(g));
}

export async function getAllNeedReviewGoods() {
  const desc = await getApi("/goods/needReview");
  return desc.map(d => processGoodsDescription(d));
}

export function goodsReviewApprove(descriptionId) {
  return postApi(`/goods/${descriptionId}/review/approve`);
}

export function goodsReviewRequestChange(descriptionId, comments) {
  return postApi(`/goods/${descriptionId}/review/requestChange`, {
    comments
  });
}
