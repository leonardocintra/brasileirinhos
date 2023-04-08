import useSWR from "swr";

const CATARINA_API_URL: string =
  process.env.CATARINA_API_URL || "http://localhost:3005/api";

export function usePessoa() {
  const { data, isLoading, error } = useSWR(
    `${CATARINA_API_URL}/v1/pessoa`,
    fetcherWithToken
  );
  return {
    pessoaData: data,
    pessoaIsLoading: isLoading,
    pessoaError: error,
  };
}

async function fetcherWithToken(url: RequestInfo | URL): Promise<any> {
  const token = await getToken();
  const params: RequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token.token}`,
    },
  };
  return await fetch(url, params).then((res) => res.json());
}

export default async function getToken() {
  try {
    const params: RequestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "*",
        Accept: "application/json",
      },
      body: JSON.stringify({
        username: process.env.CATARINA_USERNAME || "leonardo",
        password: process.env.CATARINA_PASSWORD || "C7jwurrnleo#",
      }),
    };
    const response = await fetch(`${CATARINA_API_URL}/auth/login`, params);
    return await response.json();
  } catch (e) {
    console.error(e);
  }
}
