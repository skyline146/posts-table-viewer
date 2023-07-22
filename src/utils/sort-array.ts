import { Post } from "../ts";

export function sortArrayByType(arr: Post[], type: string) {
  const arrForSort = [...arr];
  return arrForSort.sort((a: Post, b: Post) => {
    const nameA = a[type as keyof Post].toString().toLowerCase();
    const nameB = b[type as keyof Post].toString().toLowerCase();
    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }

    return 0;
  });
}
