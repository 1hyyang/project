<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<title>용인시 청소차 관제 시스템</title>
<script src="https://openlayers.org/en/v5.3.0/build/ol.js"></script>
<link rel="stylesheet" 	href="https://openlayers.org/en/v5.3.0/css/ol.css" type="text/css">
<link rel="stylesheet" href="/resources/css/gis.css" type="text/css">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="icon" type="image/png" sizes="32x32" href="/resources/images/favicon-32x32.png">
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;600&display=swap" rel="stylesheet">
<script src="https://code.jquery.com/jquery-2.2.3.min.js"></script>
<script src="https://kit.fontawesome.com/0aadd0de21.js" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/chart.js@3.5.1/dist/chart.min.js"></script>
<script src="/resources/js/gis_layer.js"></script>
<script src="/resources/js/gis_car.js"></script>
<script src="/resources/js/gis_modal.js"></script>
<script src="/resources/js/gis_chart.js"></script>
<script>
window.addEventListener("load", function(){	
	btn_logout.addEventListener("click", function(){
		location.href = "/logout";
	})
	
	// 차량목록에서 특정 차량을 선택하면
	for(let i=0; i<${carList.size()}; i++){
		let selectedCar = document.querySelector("#btn_car_" + i);		
		selectedCar.addEventListener("click", function(){
			// 모든 차량목록의 배경색을 흰색으로 바꾼다
			let car = document.getElementsByClassName("tbl_carlist_content");
			for(let j=0; j<car.length; j++){
				car[j].style.background = "white";
				car[j].style.color = "black";
			}
			
			// 차량목록 중 선택한 차량의 배경색을 남색으로 바꾼다
			selectedCar.style.background = "#0054a7";
			selectedCar.style.color = "white";
			
			// 차량 정보를 보여준다
			selectedCar_info.style.display = "block";
			selectedCar_num.innerHTML = `<i class="fa-solid fa-truck-front" style="padding-left: 55px"></i> <span id="car_num">` + selectedCar.innerText + `</span><span id="btn_chart" style="margin-right: 5px">통계보기 &raquo;</span>`;
			
			// 선택 가능한 날짜를 불러온다
			getDateList(car_num.innerText);
			
		    // 기존의 clean_o, clean_x, beginPoint, endPoint, course 레이어를 삭제한다
		    map.getLayers().getArray()
			  .filter(layer => layer.get("name")==="clean_o")
			  .forEach(layer => map.removeLayer(layer));    
		    map.getLayers().getArray()
			  .filter(layer => layer.get("name")==="clean_x")
			  .forEach(layer => map.removeLayer(layer));
		    map.getLayers().getArray()
			  .filter(layer => layer.get("name")==="beginPoint")
			  .forEach(layer => map.removeLayer(layer));
		    map.getLayers().getArray()
			  .filter(layer => layer.get("name")==="endPoint")
			  .forEach(layer => map.removeLayer(layer));
		    map.getLayers().getArray()
			  .filter(layer => layer.get("name")==="course")
			  .forEach(layer => map.removeLayer(layer));
		    
			// 기존의 운행시간, 청소비율을 삭제한다
			clean_time.innerText = "";
			clean_ratio.innerText = "";			

		    // 줌아웃하고 중심 좌표를 이동한다
		    map.getView().animate({
		        center: ol.proj.transform([127.1775537, 37.2410864], "EPSG:4326", "EPSG:900913"),
		        zoom: 11.5,
		        duration: 800
		    });
		    
		    btn_chart.addEventListener("click", function() {
				showModal("#modal_chart");
				modal_chart_title.innerHTML = `<i class="fa-solid fa-truck-front"> <span style="font-family: 'Noto Sans KR', sans-serif">` + car_num.innerText + `</span>`;
			});
		    
		    btn_modal_chart_submit.addEventListener("click", function() {
				fetchGet("/chart?car_num=" + car_num.innerText + "&beginDate=" + beginDate.value + "&endDate=" + endDate.value, buildChart);
			});
		})
	}
})
</script>
</head>
<body>
	<img src="/resources/images/logout.png" id="btn_logout">
	<div id="container">
		<div id="controller">
			<div id="title">
				<div id="title_logo">
					<img id="title_logo_yongin" src="resources/images/logo_yongin.png">
				</div>
				<div id="title_content">
					용인시 청소차 관제 시스템
				</div>			
			</div>
			
			<!-- gis_layer.js -->
			<table class="tbl">
				<tr>
					<th class="tbl_title tbl_noSelect">지도종류</th>
					<td class="tbl_content" id="btn_base">기본</td>
					<td class="tbl_content" id="btn_satellite">위성</td>
					<td class="tbl_content" id="btn_hybrid">하이브리드</td>
				</tr>
			</table>

			<table class="tbl">
				<tr>
					<th class="tbl_title tbl_noSelect">권역(구)</th>
					<td class="tbl_content" id="btn_gu_cheoin">처인구</td>
					<td class="tbl_content" id="btn_gu_giheung">기흥구</td>
					<td class="tbl_content" id="btn_gu_suji">수지구</td>
				</tr>
			</table>

			<!-- gis_car.js -->
			<table class="tbl" id="tbl_carlist">		
				<tr>
					<th rowspan="3" class="tbl_carlist_title tbl_noSelect">차량</th>
					<td class="tbl_carlist_content" id="btn_car_0">${carList[0].car_num}</td>
				</tr>
				<c:forEach begin="1" items="${carList}" var="carList" varStatus="loop">
				<tr>
					<td class="tbl_carlist_content" id="btn_car_${loop.index}">${carList.car_num}</td>					
				</tr>
				</c:forEach>
			</table>
						
			<div id="selectedCar_info" style="display: none">
				<table class="tbl">
					<tr>
						<th colspan="2" class="tbl_title tbl_noSelect" id="selectedCar_num" style="border-bottom: 1px solid lightgrey"></th>
					</tr>
					<tr>
						<th class="tbl_carlist_title tbl_noSelect" style="border-bottom: 1px solid lightgrey">날짜</th>
						<td class="tbl_carlist_content">
							<table class="Calendar">
								<thead>
									<tr>
										<td onClick="prevCalendar();" style="cursor: pointer"><i class="fa-solid fa-chevron-left"></td>
										<td colspan="5" class="tbl_noSelect">
											<span id="calYear"></span>년
											<span id="calMonth"></span>월
										</td>
										<td onClick="nextCalendar();" style="cursor: pointer"><i class="fa-solid fa-chevron-right"></td>
									</tr>
									<tr style="cursor: default">
										<td>일</td>
										<td>월</td>
										<td>화</td>
										<td>수</td>
										<td>목</td>
										<td>금</td>
										<td>토</td>
									</tr>
								</thead>					
								<tbody></tbody>
							</table>	
						</td>
					</tr>
					<tr>
						<th class="tbl_carlist_title tbl_noSelect" style="border-bottom: 1px solid lightgrey">운행시간</th>
						<td class="tbl_carlist_content tbl_noSelect" id="clean_time"></td>
					</tr>
					<tr>
						<th class="tbl_carlist_title tbl_noSelect" style="border-bottom: 1px solid lightgrey">청소비율</th>
						<td class="tbl_carlist_content tbl_noSelect" id="clean_ratio"></td>
					</tr>
				</table>
			</div>
			
			<div style="position: absolute; top: 810px;">
				<div id="btn_addCar" style="display: inline-block">
					<div class="btn_circle_icon"><i class="fa-solid fa-plus"></i></div><span class="btn_circle_content">차량 추가</span>
				</div>
				
				<div id="btn_addData" style="display: inline-block">
					<div class="btn_circle_icon"><i class="fa-solid fa-plus"></i></div><span class="btn_circle_content">데이터 추가</span>
				</div>
						        
				<div id="btn_question" style="display: inline-block">
					<div class="btn_circle_icon"><i class="fa-solid fa-question"></i></div><span class="btn_circle_content">도움말</span>
				</div>
			</div>
			
			<!-- 차량 추가 모달 -->
			<div id="modal_addCar" class="modal" style="display: none">
				<div class="modal_title">차량 추가</div>
				<form name="form_addCar" action="/addCar">
					<div class="modal_body">
						<span class="info"><i class="fa-solid fa-circle-info"></i> 차량번호를 입력하세요.</span>
						<input type="text" name="car_num" required>
						<span class="info"><i class="fa-solid fa-circle-info"></i> 차량유형을 선택하세요.</span>
						<select name="car_type" required>
							<option value="진공노면청소">진공노면청소</option>
							<option value="분진흡입">분진흡입</option>
						</select>
			        </div>
			        <div class="modal_foot">
			            <button type="submit" class="btn_modal_submit">확인</button>
			            <button type="button" class="btn_modal_close">닫기</button>
			        </div>
			    </form>
	        </div>
	        
			<!-- 데이터 추가 모달 -->
			<div id="modal_addData" class="modal" style="display: none">
				<div class="modal_title">데이터 추가</div>
				<form name="form_addData" method="post" enctype="multipart/form-data" action="/addData">
					<div class="modal_body">
						<span class="info"><i class="fa-solid fa-circle-info"></i> gps 데이터를 추가하세요.</span>
			            <input type="file" class="file-selector" name="file_gps" accept=".csv" required>
			            <span class="info"><i class="fa-solid fa-circle-info"></i> rpm 데이터를 추가하세요.</span>
				      	<input type="file" class="file-selector" name="file_rpm" accept=".csv" required>
			            <span class="info"><i class="fa-solid fa-circle-info"></i> noise 데이터를 추가하세요.</span>
				      	<input type="file" class="file-selector" name="file_noise" accept=".csv" required>
			        </div>
			        <div class="modal_foot">
			            <button type="submit" class="btn_modal_submit">확인</button>
			            <button type="button" class="btn_modal_close">닫기</button>
			        </div>
			    </form>
	        </div>
	        
	        <!-- 도움말 모달 -->
			<div id="modal_question" class="modal" style="display: none">
				<div class="modal_title">도움말</div>				
				<div class="modal_body">
					<p class="question_content"><img src="/resources/images/boundary.png" class="question_img">　행정구역의 경계를 나타냅니다.</p>
					<p class="question_content"><img src="/resources/images/course.png" class="question_img">　청소차의 이동경로를 나타냅니다.</p>
					<p class="question_content"><img src="/resources/images/clean_o.png" class="question_img">　센서를 통해 측정된 값이 1500rpm 이상 80dB 이상으로, 　　 청소한 것으로 간주합니다.</p>
					<p class="question_content"><img src="/resources/images/clean_x.png" class="question_img">　센서를 통해 측정된 값이 1500rpm 미만 80dB 미만으로, 　　 청소하지 않은 것으로 간주합니다.</p>					
					<p class="question_content"><img src="/resources/images/beginPoint.png" class="question_img">　청소 시작 위치를 나타냅니다.</p>
					<p class="question_content"><img src="/resources/images/endPoint.png" class="question_img">　청소 종료 위치를 나타냅니다.</p>
		        </div>
		        <div class="modal_foot">
		            <button type="button" class="btn_modal_close">닫기</button>
		        </div>
	        </div>
	        
	        <!-- 통계 모달 -->
			<div id="modal_chart" class="modal" style="display: none">
				<div class="modal_title" id="modal_chart_title"></div>				
				<div class="modal_body">
					<span class="info"><i class="fa-solid fa-circle-info"></i> 조회할 날짜를 선택하세요.</span><p></p>
					<input type="date" id="beginDate" name="beginDate">~<input type="date" id="endDate" name="endDate"><button type="submit" id="btn_modal_chart_submit" class="btn_modal_submit">확인</button>
			        <canvas id="chart_bar" class="chart" style="height: 200px"></canvas>
			        <canvas id="chart_polarArea" class="chart" style="height: 250px"></canvas>
		        </div>
		        <div class="modal_foot">
		            <button type="button" id="btn_modal_chart_close" class="btn_modal_close">닫기</button>
		        </div>
	        </div>
		</div>
		
		<div id="map"></div>
	</div>
</body>
</html>