export const createWordLink = ({
  searchText,
  resultIndex,
}: {
  searchText: string;
  resultIndex: number;
}): string => {
  return `/word?search=${searchText}&index=${resultIndex}`;
};
