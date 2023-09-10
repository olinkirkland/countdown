import { SERVER_URL } from './Main';

export async function fetchMadlib() {
  const response = await fetch(SERVER_URL + 'madlibs?password=miffy');
  const data = await response.json();
  return data;
}
