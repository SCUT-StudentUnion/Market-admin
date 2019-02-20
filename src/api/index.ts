const baseUri = "/api";

export enum ErrorCode {
  InvalidJwt = 'invalid-jwt',
}

export class ApiError extends Error {
  constructor(code: ErrorCode, message: string) {
    super(message);
    this.code = code;
    this.message = message;
  }

  code: ErrorCode;
  message: string;
}

async function readApiResponse<T>(response: Response) {
  if (!response.ok) throw Error("Not OK");
  const json = await response.json();
  return json as T;
}

async function callApi<T>(path: string, query?: Record<string, string>, init?: RequestInit) {
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
  return await readApiResponse<T>(res);
}

function getApi<T>(path: string, query?: Record<string, string>, init?: RequestInit) {
  return callApi<T>(path, query, {
    method: 'GET',
    ...init
  })
}

function postApi<T>(path: string, body?: Object, query?: Record<string, string>, init?: RequestInit) {
  const builtInit: RequestInit = {
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
  return callApi<T>(path, query, builtInit);
}

const jwtStorageKey = "JWT";
const jwtStorage = sessionStorage;
export function getJwt() {
  return jwtStorage.getItem(jwtStorageKey);
}

interface LoginResult {
  jwt: string;
}

export async function login(username: string, password: string) {
  const result = await postApi<LoginResult>("/admin/login", {
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

export interface GoodsDescription {
  createdTime: Date;
  reviewedTime: Date;
}

export interface Goods {
  onShelfTime: Date;
  currentDescription: GoodsDescription;
}

function processGoods(g: Goods) {
  g.onShelfTime = new Date(g.onShelfTime);
  processGoodsDescription(g.currentDescription);
  return g;
}

function processGoodsDescription(d: GoodsDescription) {
  d.createdTime = new Date(d.createdTime);
  d.reviewedTime = new Date(d.reviewedTime);
  return d;
}

interface Pageable {
  page: number;
  size: number;
}

export interface PageResult<T> {
  totalPages: number;
  content: T[];
}

function toQuery(q: Object) {
  const query: Record<string, string> = {};
  for (const [k,v] of Object.entries(q)) {
    query[k] = v.toString();
  }
  return query;
}

export async function getAllGoods(query: Pageable) {
  const result = await getApi<PageResult<Goods>>("/goods", toQuery(query));
  result.content.forEach((g: Goods) => processGoods(g));
  return result;
}

export async function getAllNeedReviewGoods(query: Pageable) {
  const result = await getApi<PageResult<GoodsDescription>>("/goods/needReview", toQuery(query));
  result.content.forEach((d: GoodsDescription) => processGoodsDescription(d));
  return result;
}

export async function getAllChangeRequestedGoods(query: Pageable) {
  const result = await getApi<PageResult<GoodsDescription>>("/goods/changeRequested", toQuery(query));
  result.content.forEach((d: GoodsDescription) => processGoodsDescription(d));
  return result;
}

export function goodsReviewApprove(descriptionId: number) {
  return postApi(`/goods/${descriptionId}/review/approve`);
}

export function goodsReviewRequestChange(descriptionId: number, comments: string) {
  return postApi(`/goods/${descriptionId}/review/requestChange`, {
    comments
  });
}
