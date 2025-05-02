export function getSubstringAfterLast(
  string: string,
  searchString: string
): string {
  const afterlastIndex = string.lastIndexOf(searchString) + 1;
  return string.slice(afterlastIndex, string.length);
}
