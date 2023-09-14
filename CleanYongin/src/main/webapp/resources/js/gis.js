window.addEventListener("load", function(){	
	// 로그아웃 버튼을 클릭하면 로그아웃
	btn_logout.addEventListener("click", function(){
		location.href = "/logout";
	})
	
	// 차량 목록 전체 불러오기
	fetchGet("/carListAll", showCarListAll);
	
	// 레이어 구성
	var VworldBase, VworldSatellite, VworldHybrid;
	var attr = "&copy; <a href='http://dev.vworld.kr'>vworld</a>";
	var VworldHybrid = new ol.source.XYZ({
		url: "https://api.vworld.kr/req/wmts/1.0.0/CEB52025-E065-364C-9DBA-44880E3B02B8/Hybrid/{z}/{y}/{x}.png"
	}); // 문자 타일 레이어
	
	var VworldSatellite = new ol.source.XYZ({
		url: "https://api.vworld.kr/req/wmts/1.0.0/CEB52025-E065-364C-9DBA-44880E3B02B8/Satellite/{z}/{y}/{x}.jpeg"
		,attributions : attr
	}); // 항공사진 레이어 타일

	var VworldBase = new ol.source.XYZ({
		url: "https://api.vworld.kr/req/wmts/1.0.0/CEB52025-E065-364C-9DBA-44880E3B02B8/Base/{z}/{y}/{x}.png"
		,attributions : attr
	}); // 기본지도 타일
	
	var base_button = document.createElement("button");
	base_button.innerHTML = "B";
	var hybrid_button = document.createElement("button");
	hybrid_button.innerHTML = "H";
	hybrid_button.className= "on";
	var sate_button = document.createElement("button");
	sate_button.innerHTML = "S";
	var element = document.createElement("div");
	element.className = "rotate-north ol-unselectable ol-control ol-mycontrol";
	
	btn_base.onclick = function(){
		var _this = this;
        map.getLayers().forEach(function(layer){
			if(layer.get("name")=="vworld"){
				btn_satellite.className = "tbl_content";
				_this.className = "tbl_content tbl_selected";
				layer.setSource(VworldBase);
			}
        })
	}    
	
	btn_satellite.onclick = function(){
		var _this = this;
        map.getLayers().forEach(function(layer){
			if(layer.get("name")=="vworld"){
				btn_base.className = "tbl_content";
				_this.className = "tbl_content tbl_selected";
				layer.setSource(VworldSatellite);
			}
        })
	}
	
	btn_hybrid.onclick = function(){
    	var _this = this;
   		map.getLayers().forEach(function(layer){
   			if(layer.get("name")=="hybrid"){
   				if(_this.className=="on tbl_content tbl_selected_hybrid"){
    				layer.setSource(null);
    				_this.className = "tbl_content";
   				}
   				else{
   					_this.className = "on tbl_content tbl_selected_hybrid";
   					layer.setSource(VworldHybrid);
   				}
   			}
   		})
	}
    
    element.appendChild(base_button);
    element.appendChild(sate_button);
    element.appendChild(hybrid_button);    
    
    var layerControl = new ol.control.Control({element: element});
       
	map = new ol.Map({
		controls: ol.control.defaults().extend([
			layerControl,new ol.control.OverviewMap(),new ol.control.ZoomSlider()
		]),
		layers: [			
			new ol.layer.Tile({
				source: VworldBase,
				name:"vworld"
			}), new ol.layer.Tile({
				source: VworldHybrid,
				name:"hybrid"
			})
		],
		target: "map",
		view: new ol.View({
			center: ol.proj.transform([127.1775537, 37.2410864], "EPSG:4326", "EPSG:900913"),
			zoom: 11,
			minZoom : 11,
			maxZoom : 21
		})
	});

	btn_base.className = "tbl_content tbl_selected";
	btn_hybrid.className = "tbl_content tbl_selected_hybrid";

	// 용인시 레이어 정의
	var si_yongin = new ol.layer.Tile({
		source: new ol.source.TileWMS({
			url: "http://localhost:8080/geoserver/wms",
			params: {
				"layers" : "geoserver:si_yongin",
				"tiled" : "true"
			},
			serverType: "geoserver"            
		}),
		name: "si_yongin"
	})

	// 처인구 레이어 정의
    var gu_cheoin = new ol.layer.Tile({
        source: new ol.source.TileWMS({
            url: "http://localhost:8080/geoserver/wms",
            params: {
            	"layers" : "geoserver:gu_cheoin",
            	"tiled" : "true"
            },
            serverType: "geoserver"
        }),
        name: "gu_cheoin"
    })

	// 기흥구 레이어 정의
    var gu_giheung = new ol.layer.Tile({
        source: new ol.source.TileWMS({
            url: "http://localhost:8080/geoserver/wms",
            params: {
            	"layers" : "geoserver:gu_giheung",
            	"tiled" : "true"
            },
            serverType: "geoserver"
        }),
        name: "gu_giheung"
    })

	// 수지구 레이어 정의
	var gu_suji = new ol.layer.Tile({
		source: new ol.source.TileWMS({
			url: "http://localhost:8080/geoserver/wms",
			params: {
				"layers" : "geoserver:gu_suji",
				"tiled" : "true"
			},
			serverType: "geoserver"
		}),
		name: "gu_suji"
	})
    
	// 용인시 레이어 추가
    map.addLayer(si_yongin);

	// 처인구 버튼을 클릭하면
	btn_gu_cheoin.onclick = function() {
		// 이미 선택되어 있으면 선택 해제하고 용인시 레이어 보여주기
		if(btn_gu_cheoin.className==="tbl_content gu_selected") {
			btn_gu_cheoin.className = "tbl_content";
			map.addLayer(si_yongin);
			map.removeLayer(gu_cheoin);
			map.removeLayer(gu_giheung);
			map.removeLayer(gu_suji);
			map.getView().animate({
				center: ol.proj.transform([127.1775537, 37.2410864], "EPSG:4326", "EPSG:900913"),
				zoom: 11,
				duration: 800
			});
	        
			// 차량 목록 전체 불러오기
			fetchGet("/carListAll", showCarListAll);
	    	
			// 차량 정보를 안 보이게
			selectedCar_info.style.display = "none";
	    	
			// 기존의 레이어 삭제
			deleteLayers();
		}
	    
		// 선택되어 있지 않으면 처인구 선택
		else{
			btn_gu_cheoin.className = "tbl_content gu_selected";
			btn_gu_giheung.className = "tbl_content";
			btn_gu_suji.className = "tbl_content";
			map.removeLayer(si_yongin);
			map.addLayer(gu_cheoin);
			map.removeLayer(gu_giheung);
			map.removeLayer(gu_suji);
			map.getView().animate({
				center: ol.proj.transform([127.2529331499, 37.2033318957], "EPSG:4326", "EPSG:900913"),
				zoom: 11.5,
				duration: 800
			});
	        
			// 처인구 소속 차량 불러오기
			fetchGet("/carList?car_area=gu_cheoin", showCarList);
	        
			// 차량 정보를 안 보이게
			selectedCar_info.style.display = "none";
	    	
			// 기존의 레이어 삭제
			deleteLayers();
		}
	}

	// 기흥구 버튼을 클릭하면
	btn_gu_giheung.onclick = function() {
		// 이미 선택되어 있으면 선택 해제하고 용인시 레이어 보여주기
		if(btn_gu_giheung.className==="tbl_content gu_selected") {
			btn_gu_giheung.className = "tbl_content";
			map.addLayer(si_yongin);
			map.removeLayer(gu_cheoin);
			map.removeLayer(gu_giheung);
			map.removeLayer(gu_suji);
			map.getView().animate({
				center: ol.proj.transform([127.1775537, 37.2410864], "EPSG:4326", "EPSG:900913"),
				zoom: 11,
				duration: 800
			});
	        
			// 차량 목록 전체 불러오기
			fetchGet("/carListAll", showCarListAll);
	    	
			// 차량 정보를 안 보이게
			selectedCar_info.style.display = "none";
	    	
			// 기존의 레이어 삭제
			deleteLayers();
		}
	    
		// 선택되어 있지 않으면 기흥구 선택
		else{
			btn_gu_cheoin.className = "tbl_content";
			btn_gu_giheung.className = "tbl_content gu_selected";
			btn_gu_suji.className = "tbl_content";
			map.removeLayer(si_yongin);
			map.removeLayer(gu_cheoin);
			map.addLayer(gu_giheung);
			map.removeLayer(gu_suji);
			map.getView().animate({
				center: ol.proj.transform([127.1213408459, 37.2674315832], "EPSG:4326", "EPSG:900913"),
				zoom: 11.5,
				duration: 800
			});
	        
			// 기흥구 소속 차량 불러오기
			fetchGet("/carList?car_area=gu_giheung", showCarList);
	        
			// 차량 정보를 안 보이게
			selectedCar_info.style.display = "none";
	    	
			// 기존의 레이어 삭제
			deleteLayers();
		}
	}

	// 수지구 버튼을 클릭하면
	btn_gu_suji.onclick = function() {
		// 이미 선택되어 있으면 선택 해제하고 용인시 레이어 보여주기
		if (btn_gu_suji.className==="tbl_content gu_selected") {
			btn_gu_suji.className = "tbl_content";
			map.addLayer(si_yongin);
			map.removeLayer(gu_cheoin);
			map.removeLayer(gu_giheung);
			map.removeLayer(gu_suji);
			map.getView().animate({
				center: ol.proj.transform([127.1775537, 37.2410864], "EPSG:4326", "EPSG:900913"),
				zoom: 11,
				duration: 800
			});
	        
			// 차량 목록 전체 불러오기
			fetchGet("/carListAll", showCarListAll);
	    	
			// 차량 정보를 안 보이게
			selectedCar_info.style.display = "none";
	    	
			// 기존의 레이어 삭제
			deleteLayers();
		} 
		// 선택되어 있지 않으면 수지구 선택
		else {
			btn_gu_cheoin.className = "tbl_content";
			btn_gu_giheung.className = "tbl_content";
			btn_gu_suji.className = "tbl_content gu_selected";
			map.removeLayer(si_yongin);
			map.removeLayer(gu_cheoin);
			map.removeLayer(gu_giheung);
			map.addLayer(gu_suji);
			map.getView().animate({
				center: ol.proj.transform([127.0715510732, 37.3334474297], "EPSG:4326", "EPSG:900913"),
				zoom: 11.5,
				duration: 800
			});
	        
			// 수지구 소속 차량 불러오기
			fetchGet("/carList?car_area=gu_suji", showCarList);
	        
			// 차량 정보를 안 보이게
			selectedCar_info.style.display = "none";
	    	
			// 기존의 레이어 삭제
			deleteLayers();
		}
	}
})

function fetchGet(url, callback){
	try{
		fetch(url)
		// 컨트롤러로부터 JSON 타입의 객체가 반환
		// 객체를 변수명 response에 받아 와서 json() 메소드를 호출
		// json() : JSON 형식의 문자열을 Promise 객체로 반환
		// Promise 객체는 then() 메소드를 사용하여 
		// 비동기 작업의 성공 또는 실패와 관련된 결과를 나타내는 대리자 역할을 수행
		.then(response => response.json())
		// 반환 받은 객체를 매개 변수로 받는 콜백 함수를 호출
		.then(map => callback(map));		
	} catch(e){
		console.log('fetchGet', e)
	}
}

// 용인시 차량 목록 조회
function showCarListAll(result){
	let carListAll = ``;
	if(result.carListAll.length==0){
		carListAll = 
			`<tr>
				<th rowspan="3" class="tbl_carlist_title tbl_noSelect">차량</th>
				<td class="tbl_carlist_content">등록된 차량이 없습니다.</td>
			</tr>`;
	}
	else{
		for(let i=0; i<result.carListAll.length; i++){
			if(i==0){
				carListAll = 
					`<tr>
						<th rowspan="3" class="tbl_carlist_title tbl_noSelect">차량</th>
						<td class="tbl_carlist_content" id="btn_car_` + i + `">` + result.carListAll[i].car_num + `</td>
					</tr>`;
			}
			else{
				carListAll += 
					`<tr>
						<td class="tbl_carlist_content" id="btn_car_` + i + `">` + result.carListAll[i].car_num + `</td>					
					</tr>`;
			}
		}
	}
	tbl_carlist.innerHTML = carListAll;
	
	// 차량 목록에서 특정 차량을 선택하면
	for(let i=0; i<result.carListAll.length; i++){
		let selectedCar = document.querySelector("#btn_car_" + i);		
		selectedCar.addEventListener("click", function(){
			selectCar(selectedCar);
		})
	}
}

// 선택한 구 차량 목록 조회
function showCarList(result){
	let carList = ``;
	if(result.carList.length==0){
		carList = 
			`<tr>
				<th rowspan="3" class="tbl_carlist_title tbl_noSelect">차량</th>
				<td class="tbl_carlist_content">등록된 차량이 없습니다.</td>
			</tr>`;
	}
	else{
		for(let i=0; i<result.carList.length; i++){
			if(i==0){
				carList = 
					`<tr>
						<th rowspan="3" class="tbl_carlist_title tbl_noSelect">차량</th>
						<td class="tbl_carlist_content" id="btn_car_` + i + `">` + result.carList[i].car_num + `</td>
					</tr>`;
			}
			else{
				carList += 
					`<tr>
						<td class="tbl_carlist_content" id="btn_car_` + i + `">` + result.carList[i].car_num + `</td>					
					</tr>`;
			}
		}
	}
	tbl_carlist.innerHTML = carList;
	
	// 차량 목록에서 특정 차량을 선택하면
	for(let i=0; i<result.carList.length; i++){
		let selectedCar = document.querySelector("#btn_car_" + i);
		selectedCar.addEventListener("click", function(){
			selectCar(selectedCar);
		})
	}
}

function selectCar(selectedCar){
	// 모든 차량 목록의 배경색을 흰색으로 바꾸기
	let car = document.getElementsByClassName("tbl_carlist_content");
	for(let j=0; j<car.length; j++){
		car[j].style.background = "white";
		car[j].style.color = "black";
	}
	
	// 차량 목록 중 선택한 차량의 배경색을 남색으로 바꾸기
	selectedCar.style.background = "#0054a7";
	selectedCar.style.color = "white";
	
	// 차량 정보 보여주기
	selectedCar_info.style.display = "block";
	selectedCar_num.innerHTML = `<i class="fa-solid fa-truck-front" style="padding-left: 55px"></i> <span id="car_num">` + selectedCar.innerText + `</span><span id="btn_chart" style="margin-right: 5px">통계보기 &raquo;</span>`;
	
	// 기존의 레이어 삭제
	deleteLayers();
    
	// 기존의 운행시간, 청소비율 삭제
	clean_time.innerText = "";
	clean_ratio.innerText = "";
	
	// 선택 가능한 날짜 불러오기
	getDateList(car_num.innerText);
    
	// 통계 모달 보여주기
	btn_chart.addEventListener("click", function() {
		showModal("#modal_chart");
		modal_chart_title.innerHTML = `<i class="fa-solid fa-truck-front"> <span style="font-family: 'Noto Sans KR', sans-serif">` + car_num.innerText + `</span>`;
	});
    
	// 통계 모달에서 선택한 기간의 통계 보여주기
	btn_modal_chart_submit.addEventListener("click", function() {
		fetchGet("/chart?car_num=" + car_num.innerText + "&beginDate=" + beginDate.value + "&endDate=" + endDate.value, buildChart);
	});
}