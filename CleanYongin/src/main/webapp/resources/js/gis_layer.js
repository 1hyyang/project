window.addEventListener("load", function(){
	var VworldBase,VworldSatellite,VworldGray,VworldMidnight,VworldHybrid;
	var attr = "&copy; <a href='http://dev.vworld.kr'>vworld</a>";
	var VworldHybrid = new ol.source.XYZ({
		url: "https://api.vworld.kr/req/wmts/1.0.0/CEB52025-E065-364C-9DBA-44880E3B02B8/Hybrid/{z}/{y}/{x}.png"
	}); //문자 타일 레이어
	
	var VworldSatellite = new ol.source.XYZ({
		url: "https://api.vworld.kr/req/wmts/1.0.0/CEB52025-E065-364C-9DBA-44880E3B02B8/Satellite/{z}/{y}/{x}.jpeg"
		,attributions : attr
	}); //항공사진 레이어 타일

	var VworldBase = new ol.source.XYZ({
		url: "https://api.vworld.kr/req/wmts/1.0.0/CEB52025-E065-364C-9DBA-44880E3B02B8/Base/{z}/{y}/{x}.png"
		,attributions : attr
	}); // 기본지도 타일

	var VworldGray =  new ol.source.XYZ({
		url: "https://api.vworld.kr/req/wmts/1.0.0/CEB52025-E065-364C-9DBA-44880E3B02B8/gray/{z}/{y}/{x}.png"
		,attributions : attr
	}); //회색지도 타일
	
	var VworldMidnight =  new ol.source.XYZ({
		url: "https://api.vworld.kr/req/wmts/1.0.0/CEB52025-E065-364C-9DBA-44880E3B02B8/midnight/{z}/{y}/{x}.png"
		,attributions : attr
	})
	
	var base_button = document.createElement("button");
	base_button.innerHTML = "B";
	var gray_button = document.createElement("button");
	gray_button.innerHTML = "G";
	var midnight_button = document.createElement("button");
	midnight_button.innerHTML = "M";
	var hybrid_button = document.createElement("button");
	hybrid_button.innerHTML = "H";
	hybrid_button.className= "on";
	var sate_button = document.createElement("button");
	sate_button.innerHTML = "S";
    var element = document.createElement("div");
    element.className = "rotate-north ol-unselectable ol-control ol-mycontrol";
	
	btn_base.onclick=function(){
		var _this = this;
        map.getLayers().forEach(function(layer){
			if(layer.get("name")=="vworld"){
				btn_satellite.className = "tbl_content";
				_this.className = "tbl_content tbl_selected";
				layer.setSource(VworldBase);
			}
	    })
    }    
	
	btn_satellite.onclick=function(){
		var _this = this;
        map.getLayers().forEach(function(layer){
			if(layer.get("name")=="vworld"){
				btn_base.className = "tbl_content";
				_this.className = "tbl_content tbl_selected";
				layer.setSource(VworldSatellite);
			}
	    })
    }
	
	btn_hybrid.onclick=function(){
    	var _this = this;
   		map.getLayers().forEach(function(layer){
   			if(layer.get("name")=="hybrid"){
   				if(_this.className== "on tbl_content tbl_selected_hybrid"){
    				layer.setSource(null);
    				_this.className = "tbl_content";
   				}else{
   					_this.className = "on tbl_content tbl_selected_hybrid";
   					layer.setSource(VworldHybrid);
   				}
   			}
   	    })
    }
    
    element.appendChild(base_button);
    element.appendChild(gray_button);
    element.appendChild(midnight_button);
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
			}),new ol.layer.Tile({
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

	// 추가한 레이어
	var si_yongin = new ol.layer.Tile({
        source: new ol.source.TileWMS({
            //Vworld Tile 변경
            url: "http://localhost:8080/geoserver/wms",
            params: {
            "layers" : "geoserver:si_yongin",
            "tiled" : "true"
            },
            serverType: "geoserver"            
        }),
		name: "si_yongin"
    })

    var gu_cheoin = new ol.layer.Tile({
        source: new ol.source.TileWMS({
            //Vworld Tile 변경
            url: "http://localhost:8080/geoserver/wms",
            params: {
            "layers" : "geoserver:gu_cheoin",
            "tiled" : "true"
            },
            serverType: "geoserver"
        }),
        name: "gu_cheoin"
    })

    var gu_giheung = new ol.layer.Tile({
        source: new ol.source.TileWMS({
            //Vworld Tile 변경
            url: "http://localhost:8080/geoserver/wms",
            params: {
            "layers" : "geoserver:gu_giheung",
            "tiled" : "true"
            },
            serverType: "geoserver"
        }),
        name: "gu_giheung"
    })

	var gu_suji = new ol.layer.Tile({
        source: new ol.source.TileWMS({
            //Vworld Tile 변경
            url: "http://localhost:8080/geoserver/wms",
            params: {
            "layers" : "geoserver:gu_suji",
            "tiled" : "true"
            },
            serverType: "geoserver"
        }),
        name: "gu_suji"
    })
    
    map.addLayer(si_yongin);

	btn_gu_cheoin.onclick = function () {
	    if (btn_gu_cheoin.className==="tbl_content gu_selected") {
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
	    } else {
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
	    }
	}

	btn_gu_giheung.onclick = function () {
	    if (btn_gu_giheung.className==="tbl_content gu_selected") {
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
	    } else {
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
	    }
	}

	btn_gu_suji.onclick = function () {
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
	    } else {
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
	    }
	}
})