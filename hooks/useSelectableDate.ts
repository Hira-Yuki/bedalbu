import { recoilDateString } from '@/recoil/store';
import { useRecoilValue } from 'recoil';

export default function useSelectableDate() {
  const [year, month, date] = useRecoilValue(recoilDateString);

  // month와 date를 두 자리로 맞춤
  const formattedMonth = String(month).padStart(2, '0');
  const formattedDate = String(date).padStart(2, '0');

  const maxSelectableDate = `${year}-${formattedMonth}-${formattedDate}`;

  return maxSelectableDate;
}
