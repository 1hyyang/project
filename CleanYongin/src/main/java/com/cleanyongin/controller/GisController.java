package com.cleanyongin.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.cleanyongin.service.GisService;

@Controller
public class GisController {

	@Autowired
	GisService gisService;
	
	@GetMapping("gis")
	public void getCarList(Model model) {
		gisService.getCarList(model);
	}
	
	@GetMapping("dateList")
	@ResponseBody
	public Map<String, Object> getDateList(String car_num){
		return gisService.getDateList(car_num);
	}
	
	@GetMapping("cleanTimeRatio")
	@ResponseBody
	public Map<String, Object> getCleanTimeRatio(String car_num, String date){
		return gisService.getCleanTimeRatio(car_num, date);
	}
	
	@GetMapping("addCar")
	public String addCar(String car_num, String car_type) {
		gisService.addCar(car_num, car_type);
		return "redirect:/gis";
	}
	
	@PostMapping("addData")
	public String addData(List<MultipartFile> file_gps, List<MultipartFile> file_rpm, List<MultipartFile> file_noise){
		gisService.addData(file_gps, file_rpm, file_noise);
		return "redirect:/gis";
	}
	
	@GetMapping("chart")
	@ResponseBody
	public Map<String, Object> getChart(String car_num, String beginDate, String endDate){
		return gisService.getChart(car_num, beginDate, endDate);
	}
	
}
