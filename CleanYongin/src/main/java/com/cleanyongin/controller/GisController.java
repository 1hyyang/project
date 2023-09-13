package com.cleanyongin.controller;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.cleanyongin.service.GisService;
import com.cleanyongin.vo.UserVO;

@Controller
public class GisController {

	@Autowired
	GisService gisService;
	
	@GetMapping("login")
	public String login(HttpSession session) {
		if(session.getAttribute("id")!=null && !session.getAttribute("id").toString().equals("")) {
			return "redirect:/gis";
		}
		else {
			return "/login";
		}
	}
	
	@PostMapping("loginAction")
	@ResponseBody
	public Map<String, Object> loginAction(@RequestBody UserVO user, HttpSession session) {
		return gisService.login(user, session);
	}
	
	@GetMapping("logout")
	public String logout(HttpSession session) {
		session.invalidate();
		return "redirect:/login";
	}
	
	@GetMapping("gis")
	public void gis() {
		
	}
	
	@GetMapping("carListAll")
	@ResponseBody
	public Map<String, Object> getCarListAll() {
		return gisService.getCarListAll();
	}
	
	@GetMapping("carList")
	@ResponseBody
	public Map<String, Object> getCarList(String car_area){
		return gisService.getCarList(car_area);
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
	public String addCar(String car_num, String car_type, String car_area) {
		gisService.addCar(car_num, car_type, car_area);
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
