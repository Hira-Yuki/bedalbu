export default function useDate() {
  const date = new Date();

  const thisYear = date.getFullYear();
  const thisMonth = date.getMonth();
  return { thisYear, thisMonth };
}
