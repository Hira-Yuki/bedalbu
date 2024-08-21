import { atom, selector } from 'recoil';

// export const textState = atom({
//   key: 'textState', // 고유한 ID (다른 atom들과 구분하기 위해 필요)
//   default: '', // 초기값
// });

// export const charCountState = selector({
//   key: 'charCountState', // 고유한 ID
//   get: ({ get }) => {
//     const text = get(textState);
//     return text.length;
//   },
// });

export const recoilPlatformList = atom<string[]>({
  key: 'platformList',
  default: [],
});

export const recoilDateString = selector({
  key: 'dateString',
  get: () => {
    const date = new Date();
    return [date.getFullYear(), date.getMonth() + 1, date.getDate()];
  },
});
