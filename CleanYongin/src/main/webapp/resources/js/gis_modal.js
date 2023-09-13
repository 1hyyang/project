window.addEventListener("load", function(){
	btn_addCar.addEventListener("click", function() {
		showModal("#modal_addCar");
	});
	
	btn_addData.addEventListener("click", function() {
		showModal("#modal_addData");
	});
	
	btn_question.addEventListener("click", function() {
		showModal("#modal_question");
	});
})

function showModal(id){
	let zIndex = 999;
	let modal = document.querySelector(id);

    // 모달 div 뒤 bg 레이어 정의
	let bg = document.createElement("div");
    bg.setStyle({
        position: "fixed",
        zIndex: zIndex,
        left: "0px",
        top: "0px",
        width: "100%",
        height: "100%",
        overflow: "auto",
        backgroundColor: "rgba(0,0,0,0.4)"
    });
    document.body.append(bg);

    // 닫기 버튼 클릭하면 bg 레이어와 모달 div 닫기
    modal.querySelector(".btn_modal_close").addEventListener("click", function() {
    	if(beginDate.value!=""){
    		beginDate.value = "";
    	}
    	if(endDate.value!=""){
    		endDate.value = "";
    	}
    	if(chart_bar.style.display=="block" && chart_polarArea.style.display=="block"){
    		chart_bar.style.display = "none";
    		chart_polarArea.style.display = "none";    		
    	}
        bg.remove();
        modal.style.display = "none";
    });
    
    modal.setStyle({
        position: "fixed",
        display: "block",
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.2)",

        // bg 레이어 보다 한 칸 위에 보이기
        zIndex: zIndex+1,

        // div 가운데 정렬
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        msTransform: "translate(-50%, -50%)",
        webkitTransform: "translate(-50%, -50%)"
    });
}

// Element에 style 한번에 오브젝트로 설정하는 함수 추가
Element.prototype.setStyle = function(styles) {
    for (let k in styles) this.style[k] = styles[k];
    return this;
};