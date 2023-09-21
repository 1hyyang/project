# project-CleanYongin
용인시 청소차 GIS 관제시스템 구축 프로젝트입니다.
<br><br>

## 🧠 개발 배경 및 목적
- 미세먼지 저감을 위한 노면 청소차량 사업을 운영하면서 용인시청 관리자가 작업 수행 여부를 실질적으로 확인할 수 있는 방안 필요
- 청소차량의 진동 및 소음 센서로부터 수집된 데이터를 연계한 GIS 관제시스템 구축
<br>

## ⚙️ 개발 환경 및 시스템 구조
- Frontend
  - `HTML` `JS` `CSS`
  - `OpenLayers 5.3.0`
  - `Chart.js 3.5.1`
- Backend
  - `Java 11.0.18`
  - `Spring 5.0.7`
  - `APACHE TOMCAT 9.0`
  - `GeoServer 2.23.2`
- Database
  - `PostgreSQL 13.12`
- Desktop
  - `QGIS 3.28`
<br>

## 🪄 주요 기능
- 로그인
  - 등록된 사용자만 서비스 이용 가능
- 배경 지도
  - 기본/위성/하이브리드의 세 가지 배경 지도 전환
  - Zoom-in/Zoom-out
- 상세보기
  - 선택한 권역(구)의 소속 차량 조회
  - 선택한 차량의 운행 날짜 조회 및 달력 표시
  - 선택한 날짜의 운행 시간, 청소 비율 조회
- 레이어
  - 용인시와 소속구의 경계를 레이어로 표시
  - 청소차량의 운행 정보(좌표/진동수/소음, 경로)를 점, 선 레이어로 표시
- 데이터 입력
  - 새로운 차량 DB 입력
  - 좌표/진동수/소음 데이터를 담고 있는 csv 파일 업로드 및 DB 입력
- 통계
  - 특정 기간 동안의 청소차량 운행 정보를 그래프로 시각화
<br>

## 🎞️ 시연
<br>
<video src="https://github.com/1hyyang/project/assets/128003856/fe2dab10-468f-4d49-a171-05534ef2faf1"></video>
<br>

## 🚩 기대 효과 및 활용 방안
- 청소차량 용역사와 용인시청 관리자의 업무 효율성과 정확도 향상을 도모
- 안전하고 깨끗한 도시 환경 조성을 위한 체계적이고 생산적인 운영과 관리 지원 가능
