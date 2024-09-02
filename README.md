# 배달 가계부 - 배달부

배달 플랫폼 노동자를 위한 수익 및 지출 관리 앱. 편리한 데이터 입력 / 조회 기능을 제공합니다.  
버전: 0.0.1
-------------
**************** 개발 임시 중단 개발 도구 및 플랫폼 등 재설계 목적 ****************
<!-- [demo link](https://.....) -->

## Installation

### 설치 방법

```bash
# 저장소를 클론합니다.
git clone https://github.com/Hira-Yuki/bedalbu.git
```

```bash
# 프로젝트 디렉토리로 이동합니다.
cd bedalbu
```

```bash
# 필요한 종속성을 설치합니다.
npm install
```

### 로컬 실행 방법

```bash
# 개발 서버를 시작합니다.
npm run start

```

## Project Doc

### Built With

| package name | version |
| ------------ | ------- |
| React        | 18.2.0  |
| typescript   | ~5.3.3  |

_자세한 개발 스택은 package.json 참고_

### View

<!-- 추후 변경 필요 -->

1. `app/index.tsx` : 앱 기동 시 데이터 로드 후 결과에 따른 분기처리
2. `app/initializer.tsx` : 데이터 로드 결과 데이터가 없을 시 이동되는 초기 설정 화면
3. `app/(tabs)/index.tsx` : 앱의 메인 화면, 현재 날짜를 가져와 이달의 수행 내역을 표시함

### etc

`components/LoadingIndicator`

![LoadingIndicator](https://velog.velcdn.com/images/yukihira/post/963adda6-7d60-41ee-878d-85fd6077cdd1/image.webp)

## Information

- [project notion](https://fiore-sakura.notion.site/RN-9671e9240abf4e0dbccfe2bfe41c10f6?pvs=4)
  <!-- {포함 항목} -->
  - 기획 배경
  - 와이어프레임
  - 태스크
  - 관련 기술 문서 등

## Author

- [Jinyeong Yun(윤진영)](www.linkedin.com/in/jinyeong-yun-1b995317a)

<!-- # Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions. -->
