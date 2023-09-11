function buildChart(result) {
	if(window.bar){
		window.bar.destroy();
	}
	if(window.polarArea){
		window.polarArea.destroy();
	}
	
    chart_bar.style.display = "block";
    
    let labels_time = [];
    let data_time = [];
    
    // 데이터 수집 및 시간을 분으로 변환
    result.chart.forEach(chart => {
        labels_time.push(chart.date);
        data_time.push(timeToMinutes(chart.time));
    });    

    // 운행시간 차트 생성
    window.bar = new Chart(chart_bar, {
        type: "bar",
        data: {
            labels: labels_time,
            datasets: [{
                data: data_time
            }]
        },
        options: {
        	responsive: false,
            plugins: {
                legend: false,
                title: {
                  display: true,
                  text: '운행시간(분)'
                }
            }
        }
    });
    
    chart_polarArea.style.display = "block";
    
    let labels_ratio = [];
    let data_ratio = [];
    
    // 데이터 수집
    result.chart.forEach(chart => {
        labels_ratio.push(chart.date);
        data_ratio.push(chart.ratio);
    });    
    
 	// 청소비율 차트 생성
    window.polarArea = new Chart(chart_polarArea, {
        type: "polarArea",
        data: {
            labels: labels_ratio,
            datasets: [{
                data: data_ratio
            }]
        },
        options: {
            responsive: false,
            scales: {
                r: {
                    suggestedMin: 0, 
                    suggestedMax: 100,
                    pointLabels: {
	                    display: true,
	                    centerPointLabels: true,
	                    font: {
	                      size: 12
	                    }
	                }
                }
            },
            plugins: {
                legend: false,
                title: {
                  display: true,
                  text: '청소비율(%)'
                }
            }
        }
    });
}

// 시:분:초 형식의 시간을 분으로 변환하는 함수
function timeToMinutes(time) {
    const parts = time.split(":");
    const hours = parseInt(parts[0], 10);
    const minutes = parseInt(parts[1], 10);
    const seconds = parseInt(parts[2], 10);
    return (hours * 60) + minutes + (seconds / 60);
}