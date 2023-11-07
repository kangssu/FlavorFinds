<p align="center">
  <img src="https://hackmd.io/_uploads/H1DLxtvQp.png" width="100%" height="300" />
</p>

<h1 align="center">지리기반 맛집 추천 서비스</h1>

<p align="center">
본 서비스는 공공 데이터를 활용하여, 지역 음식점 목록을 자동으로 업데이트 합니다.<br> 
이를 통해 사용자 위치 기반의 맛집 리스트를 제공하고 맛집들의 메뉴를 추천합니다.<br>
더불어 맛집에 대한 평가를 등록하여<br>
음식을 좋아하는 사람들 간의 소통을 할 수 있는 서비스입니다.
</p>

<br>

<h2 align="center">Skills</h2>
<p align="center">
<img src="https://img.shields.io/badge/Node.js-version 18-339933">&nbsp;
<img src="https://img.shields.io/badge/Nest.js-version 10-E0234E">&nbsp;
<img src="https://img.shields.io/badge/TypeScript-version 5-3178C6"><br>
<img src="https://img.shields.io/badge/TypeORM-version 0.3-fcad03">&nbsp;
<img src="https://img.shields.io/badge/MySQL-version 8-00758F">&nbsp;
<img src="https://img.shields.io/badge/Redis-version 2.1.0-DC382C">
</p>

<br>

## 📖 목차
1. [Getting Started](#Getting-Started)
2. [ERD](#ERD)
3. [REST API](#REST-API)
4. [구현 내용](#구현-내용)
5. [Authors](#Authors)


<br>

## Getting Started
```bash
> npm install                # 패키지 설치
> npm run migration:create   # 테이블 생성
> npm run start              # 앱 실행
```

<br>

## ERD
- 사용자 ↔️ 평가 `1:N`
  - 하나의 사용자가 여러 개의 평가를 등록할 수 있습니다.
- 맛집 ↔️ 평가 `1:N`
  - 하나의 맛집에 여러 개의 평가를 등록할 수 있습니다.

![image.png](https://hackmd.io/_uploads/S1j4QjDmT.png)

<br>

## REST API
> [`GitHub Wiki`로 이동! 🏃🏻‍💨](https://github.com/Wanted-Pre-Onboarding-Team-E/geography-based-restaurant-recommendation/wiki/REST-API)

<br>

## 구현 내용
#### 사용자
- 계정명, 비밀번호를 사용하여 회원가입하고, `bcrypt`로 비밀번호를 암호화합니다.
- `Cookie`와 `JWT` 기반으로 인증합니다.
- 로그인 이후 모든 `API` 요청에 대해 `JWT` 유효성을 검증합니다.
- 사용자는 현재 위치(위도/경도), 점심 추천 기능 사용 여부를 수정할 수 있습니다.

#### 데이터 수집 및 전처리
- 공공데이터 `Open API` 중 <경기도_일반음식점 김밥(도시락), 일식, 중국식>을 사용했습니다.
- `Open API` 에 포함된 모든 필드를 팀 회의를 통해 재정의하였고, `null` 값의 경우 필드 타입에 맞게 디폴트 값을 설정하는 전처리 과정을 거쳐서 `DB`에 저장됩니다.
- 도로명 주소를 `Unique`로 설정하고 동일한 도로명 주소가 있다면 업데이트, 없다면 신규 등록됩니다.

#### 맛집
- 사용자 위도/경도를 기반으로 주변 맛집 리스트를 조회합니다.
- 평가 정보를 포함하여 특정 맛집을 상세 조회할 수 있습니다.
- 사용자는 특정 맛집에 대해 평가를 등록할 수 있습니다. 평가 점수에 따라 맛집의 총 평점이 업데이트 됩니다.

#### 자동화
- `Cron Job` 스케줄링을 통해 다음과 같이 자동화를 진행합니다.
- 매주 월요일~목요일 오전 05:00
  - `Open API` 호출을 통한 맛집 데이터 업데이트
- 매주 월요일 오전 12:00
  - 시군구 목록이 담긴 `.csv` 파일을 파싱 후 캐싱
- 매주 월요일~금요일 오전 11:30
  - 서비스 사용에 동의한 사용자 대상
  - 사용자 현재 위치에서 반경 500m 이내의 랜덤 카테고리(중식, 일식, 김밥) 중 1개의 맛집
  - 메뉴(이름과 가격) 3개를 포함
  - 디스코드 `Webhook URL`과 연결된 채널로 메세지를 전송  
    <img src="https://hackmd.io/_uploads/SkP845Lm6.png" width="50%">

#### 대규모 트래픽 대비 캐싱
- 시군구 목록 데이터를 캐싱합니다.
  - 자주 변경되지 않으므로 만료 기간은 없습니다.
- 자주 조회되는 맛집 상세 정보를 캐싱합니다.
  - 조회수 100 이상일 경우 캐싱
  - 600초 삭제 데드라인 설정

<br>

## Authors
|강희수|박동훈|신은수|이드보라|이승원|
|:--:|:--:|:--:|:--:|:--:|
|<img src="https://hackmd.io/_uploads/SJ-7MdLma.jpg" width="100"/>|<img src="https://hackmd.io/_uploads/B12ir7pGp.png" width="100"/>|<img src="https://hackmd.io/_uploads/HyZ86pjzp.png" width="100"/>|<img src="https://hackmd.io/_uploads/ByC5xOhz6.jpg" width="100"/>|<img src="https://hackmd.io/_uploads/B19HTJ6zp.jpg" width="100"/>|!
|[@kangssu](https://github.com/kangssu)|[@laetipark](https://github.com/laetipark)|[@dawwson](https://github.com/dawwson)|[@sayapin1](https://github.com/sayapin1)|[@tomeee11](https://github.com/tomeee11)|


</br>

### 역할
- **강희수**
  - 공공데이터포털 `Open API` 사용 및 데이터 전처리 진행하여 데이터 저장
  - `NestJS Task Scheduling` 사용
- **박동훈**
  - ...

- **신은수**
  - 보일러 플레이트 코드 작성 및 개발 환경 설정
  - 디스코드 `Webhook`을 사용한 점심 추천 기능 및 단위 테스트
- **이드보라**
  - 맛집 상세 정보 불러오기 및 캐싱
  - `Redis` 사용
- **이승원**
  - `CSV` 데이터를 `Scheduling`을 통해 일정 주기마다 데이터 캐싱
  - `Redis` 사용하여 캐싱된 데이터 저장
  - 음식점 평가`API` 구현 및 단위 테스트
