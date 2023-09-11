package com.cleanyongin.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.ui.Model;
import org.springframework.web.multipart.MultipartFile;

@Service
public interface GisService {
	
	public void getCarList(Model model);
	public Map<String, Object> getDateList(String car_num);
	public Map<String, Object> getCleanTimeRatio(String car_num, String date);
	public void addCar(String car_num, String car_type);
	public void addData(List<MultipartFile> file_gps, List<MultipartFile> file_rpm, List<MultipartFile> file_noise);
	public Map<String, Object> getChart(String car_num, String beginDate, String endDate);
	
}
