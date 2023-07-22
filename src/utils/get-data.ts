import { Post } from "../ts";

export async function getData(url: string) {
  const response: Response = await fetch(url);

  const data: Post[] = await response.json();

  return data;
}
