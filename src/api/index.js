const baseUri = "/api";

async function readApiResponse(response) {
  if (!response.ok) throw Error("Not OK");
  const json = await response.json();
  return json;
}

async function callRestApi(resourceName) {
  const res = await fetch(baseUri + "/" + resourceName);
  return await readApiResponse(res);
}

export async function ListGoods() {
  const res = await callRestApi("goods");
  const goods = res._embedded.goods;
  goods.forEach(g => g.createdTime = new Date(g.createdTime));
  return goods;
}
