function getDateList(car_num){
	fetchGet("/dateList?car_num=" + car_num, buildCalendar);
}

let nowMonth = new Date();  // 현재 달을 페이지를 로드한 날의 달로 초기화
let today = new Date();     // 페이지를 로드한 날짜를 저장
today.setHours(0,0,0,0);    // 비교 편의를 위해 today의 시간을 초기화

// 달력 생성 : 해당 달에 맞춰 테이블을 만들고, 날짜를 채워 넣는다
function buildCalendar(result) {
	let firstDate = new Date(nowMonth.getFullYear(), nowMonth.getMonth(), 1);   // 이번달 1일
	let lastDate = new Date(nowMonth.getFullYear(), nowMonth.getMonth()+1, 0);  // 이번달 마지막날

	let tbody_Calendar = document.querySelector(".Calendar > tbody");
	document.getElementById("calYear").innerText = nowMonth.getFullYear();  // 연도 숫자 갱신
	document.getElementById("calMonth").innerText = nowMonth.getMonth()+1;  // 월 숫자 갱신

	while (tbody_Calendar.rows.length>0) {                        // 이전 출력 결과가 남아 있는 경우 초기화
		tbody_Calendar.deleteRow(tbody_Calendar.rows.length-1);
	}

	let nowRow = tbody_Calendar.insertRow();        // 첫번째 행 추가

	for (let i=0; i<firstDate.getDay(); i++) {  	// 이번달 1일의 요일만큼
		let nowColumn = nowRow.insertCell();    // 열 추가
	}

	for (let nowDay=firstDate; nowDay<=lastDate; nowDay.setDate(nowDay.getDate()+1)) {   // day는 날짜를 저장하는 변수, 이번달 마지막날까지 증가시키며 반복  
		let nowColumn = nowRow.insertCell();        // 새 열을 추가하고
		nowColumn.innerText = nowDay.getDate();     // 추가한 열에 날짜 입력

		if (nowDay.getDay()==6) {                 
			nowRow = tbody_Calendar.insertRow();    // 새로운 행 추가
		}
		
		// 청소한 일자를 문자열로 받기
		let cleanedDate = "";
		for(let i=0; i<result.dateList.length; i++){
			cleanedDate += result.dateList[i].date;
		}
		
		let date = nowDay.getFullYear() + "-" + leftPad(nowDay.getMonth()+1) + "-" + leftPad(nowDay.getDate());
		// 입력한 날짜가 청소한 일자에 포함되어 있다면
		if(cleanedDate.includes(date)){
			nowColumn.className = "cleanedDay";
			nowColumn.onclick = function(){ selectDate(this); }
		}
		else{
			nowColumn.className = "noCleanedDay";
		}
	}
}

// 이전달 버튼 클릭
function prevCalendar() {
	nowMonth = new Date(nowMonth.getFullYear(), nowMonth.getMonth()-1, 1);   // 현재 달을 1 감소시키고 날짜는 1일로 설정
	getDateList(car_num.innerText);
}

// 다음달 버튼 클릭
function nextCalendar() {
	nowMonth = new Date(nowMonth.getFullYear(), nowMonth.getMonth()+1, 1);   // 현재 달을 1 증가시키고 날짜는 1일로 설정
	getDateList(car_num.innerText);
}

// 날짜 선택
function selectDate(nowColumn) {
	// 이미 선택되었던 날짜 class 제거
	if (document.getElementsByClassName("selectedDay")[0]) {
		document.getElementsByClassName("selectedDay")[0].classList.remove("selectedDay");
	}
	// 새로 선택된 날짜 class 추가
	nowColumn.classList.add("selectedDay");
    
	// 기존의 레이어 삭제
	deleteLayers();

	// 운행시간/청소비율 구하기, 포인트 및 경로 레이어 추가
	let selectedDay = calYear.innerText + "-" + leftPad(calMonth.innerText) + "-" + leftPad(document.getElementsByClassName("selectedDay")[0].innerText);
	getCleanTimeRatio(selectedDay, car_num.innerText);
}

function deleteLayers(){
	// 기존의 clean_o, clean_x, beginPoint, endPoint, course 레이어 삭제
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
}

function getCleanTimeRatio(date, car_num){
	fetchGet("/cleanTimeRatio?date=" + date + "&car_num=" + car_num, showCleanTimeRatio);
}

function showCleanTimeRatio(result){
	// 운행시간/청소비율 띄우기
	clean_time.innerText = result.cleanTimeRatio.time;
	clean_ratio.innerText = result.cleanTimeRatio.ratio + "%";	
    
	// clean_o, clean_x, beginPoint, endPoint, course 레이어 추가
	let selectedDay = calYear.innerText + "-" + leftPad(calMonth.innerText) + "-" + leftPad(document.getElementsByClassName("selectedDay")[0].innerText);
	var clean_o = new ol.layer.Tile({
		source: new ol.source.TileWMS({
			url: "http://localhost:8080/geoserver/wms",
			params: {
				"layers": "geoserver:clean_o",
		                "tiled": "true",
		                "viewparams": "date:" + selectedDay + ";car_num:" + car_num.innerText
			},
			serverType: "geoserver"
		}),
	        name: "clean_o"
	});
    
	var clean_x = new ol.layer.Tile({
		source: new ol.source.TileWMS({
			url: "http://localhost:8080/geoserver/wms",
			params: {
		  		"layers": "geoserver:clean_x",
				"tiled": "true",
				"viewparams": "date:" + selectedDay + ";car_num:" + car_num.innerText
			},
			serverType: "geoserver"
		}),
		name: "clean_x"
	});	
    
	var beginPoint = new ol.layer.Tile({
		source: new ol.source.TileWMS({
			url: "http://localhost:8080/geoserver/wms",
			params: {
				"layers": "geoserver:beginPoint",
				"tiled": "true",
				"viewparams": "date:" + selectedDay + ";car_num:" + car_num.innerText
			},
			serverType: "geoserver"
		}),
		name: "beginPoint"
	}); 
    
	var endPoint = new ol.layer.Tile({
		source: new ol.source.TileWMS({
			url: "http://localhost:8080/geoserver/wms",
			params: {
				"layers": "geoserver:endPoint",
				"tiled": "true",
				"viewparams": "date:" + selectedDay + ";car_num:" + car_num.innerText
			},
			serverType: "geoserver"
		}),
		name: "endPoint"
	}); 
    
	var course = new ol.layer.Tile({
		source: new ol.source.TileWMS({
			url: "http://localhost:8080/geoserver/wms",
			params: {
				"layers": "geoserver:course",
				"tiled": "true",
				"viewparams": "date:" + selectedDay + ";car_num:" + car_num.innerText
			},
			serverType: "geoserver"
		}),
		name: "course"
	});   
    
	// 경로 레이어 추가
	map.addLayer(course);
    
	// 청소비율이 50% 이상이면 clean_o 레이어가 위로 가도록
	if(result.cleanTimeRatio.ratio>=50.00){
		map.addLayer(clean_x);
		map.addLayer(clean_o);
	} 
	else{
		map.addLayer(clean_o);
		map.addLayer(clean_x);
	}
	
	// 청소 시작/종료 위치 레이어 추가
	map.addLayer(beginPoint);
	map.addLayer(endPoint);
	
	// 중심 좌표 이동
	map.getView().animate({
	        center: ol.proj.transform([parseFloat(result.center.lon), parseFloat(result.center.lat)], "EPSG:4326", "EPSG:900913"),
	        zoom: 15,
	        duration: 800
	}); 
}

function leftPad(value) {
	if(value<10) {
		value = "0" + value;
		return value;
	}
	return value;
}
