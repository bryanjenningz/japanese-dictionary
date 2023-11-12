export const createWordLink = ({
  searchText,
  resultIndex,
}: {
  searchText: string;
  resultIndex: number;
}): string => {
  const searchParams = new URLSearchParams();
  searchParams.set("search", searchText);
  searchParams.set("index", String(resultIndex));
  return `/word?${searchParams.toString()}`;
};
