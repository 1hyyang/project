package com.cleanyongin.vo;

import lombok.Data;

@Data
public class PointsVO {

	private String date;
	private String car_num;
	
	// 운행시간, 청소비율을 구하기 위해 설정
	private String time;
	private String ratio;
	
	// 시작점, 끝점을 구하기 위해 설정
	private String lon;
	private String lat;
	
}
