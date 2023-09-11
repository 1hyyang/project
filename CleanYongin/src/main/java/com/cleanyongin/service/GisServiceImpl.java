package com.cleanyongin.service;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;
import org.springframework.web.multipart.MultipartFile;

import com.cleanyongin.mapper.GisMapper;

@Service
public class GisServiceImpl implements GisService{

	@Autowired
	GisMapper gisMapper;
	
	public void getCarList(Model model) {
		model.addAttribute("carList", gisMapper.getCarList());
	}
	
	@Override
	public Map<String, Object> getDateList(String car_num) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("dateList", gisMapper.getDateList(car_num));
		return map;		
	}

	@Override
	public Map<String, Object> getCleanTimeRatio(String car_num, String date) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("cleanTimeRatio", gisMapper.getCleanTimeRatio(car_num, date));
		
		// 지도의 중심점으로 사용할 point 구하기
		map.put("center", gisMapper.getCenter(car_num, date));
		return map;
	}

	@Override
	public void addCar(String car_num, String car_type) {
		gisMapper.insertCar(car_num, car_type);		
	}

	@Override
	public void addData(List<MultipartFile> file_gps, List<MultipartFile> file_rpm, List<MultipartFile> file_noise) {
		File uploadDir = new File("C:\\CleanYongin\\");
		// 디렉토리가 없으면
		if (!uploadDir.exists()) {
			// mkdirs() : 새로운 디렉토리 생성
			uploadDir.mkdirs();
		}
		
		// gps 파일
		for(MultipartFile file:file_gps) {
			// 파일을 읽기 위해 먼저 디렉토리에 저장
			// 특정 경로를 가지는 File 객체를 생성
			File sFile = new File("C:\\CleanYongin\\" + file.getOriginalFilename());
			try {
				// transferTo() : 지정한 경로에 파일을 저장
				file.transferTo(sFile);
			} catch (IllegalStateException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			}
			
	        String line;      
	        List<String> headerList = null;
	        
	        // 저장된 파일 읽어오기
	        // 	charset 기본 설정이 utf-8이어서 한글 깨짐 발생한다 
	        // 	파일의 인코딩에 맞는 charset 설정이 필요
	        try (BufferedReader br = new BufferedReader(new FileReader("C:\\CleanYongin\\" + file.getOriginalFilename(), Charset.forName("EUC-KR")))) {        	
	        	// readLine() : 파일의 한 줄을 가져와 문자열로 반환
	            while ((line = br.readLine())!=null) {            	
	            	// split() : 특정 문자를 기준으로 문자열을 나누어 배열을 반환
	                String[] data = line.split(",");
//	                System.out.println("[배열의 타입; @배열 객체의 해시 코드 == " + data);

	                if (headerList==null) {
	                    // 헤더 데이터 처리
	                	headerList = new ArrayList<>();
	                    for (String header:data) {
	                    	headerList.add(header.trim());
	                    }
//	                    System.out.println("헤더 리스트  =================== " + headerList);
	                } 
	                else {
	                    // 행 데이터 처리
	                    Map<String, Object> row = new HashMap<>();
	                    for (int i=0; i<headerList.size(); i++) {
	                        row.put(headerList.get(i), data[i].trim());
	                    }
//	                    System.out.println("행 ========================= " + row);
	                    
	                    // DB에 저장
	                    String car_num = (String)row.get("차량");
	                    String date = (String)row.get("일자");
	                    String time = (String)row.get("시간");
	                    String longitude = (String)row.get("x");
	                    String latitude = (String)row.get("y");
	                    gisMapper.insertData_gps(car_num, date, time, longitude, latitude);
	                }
	            }
	        } catch (IOException e) {
	            e.printStackTrace();
	        }
		}
		
		// rpm 파일
		for(MultipartFile file:file_rpm) {
			// 파일을 읽기 위해 먼저 디렉토리에 저장
			// 특정 경로를 가지는 File 객체를 생성
			File sFile = new File("C:\\CleanYongin\\" + file.getOriginalFilename());
			try {
				// transferTo() : 지정한 경로에 파일을 저장
				file.transferTo(sFile);
			} catch (IllegalStateException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			}
			
	        String line;      
	        List<String> headerList = null;
	        
	        // 저장된 파일 읽어오기
	        //	charset 기본 설정이 utf-8이어서 한글 깨짐 발생한다 
	        // 	파일의 인코딩에 맞는 charset 설정이 필요
	        try (BufferedReader br = new BufferedReader(new FileReader("C:\\CleanYongin\\" + file.getOriginalFilename(), Charset.forName("EUC-KR")))) {        	
	        	// readLine() : 파일의 한 줄을 가져와 문자열로 반환
	            while ((line = br.readLine())!=null) {            	
	            	// split() : 특정 문자를 기준으로 문자열을 나누어 배열을 반환
	                String[] data = line.split(",");
//	                System.out.println("[배열의 타입; @배열 객체의 해시 코드 == " + data);

	                if (headerList==null) {
	                    // 헤더 데이터 처리
	                	headerList = new ArrayList<>();
	                    for (String header:data) {
	                    	headerList.add(header.trim());
	                    }
//	                    System.out.println("헤더 리스트  =================== " + headerList);
	                } 
	                else {
	                    // 행 데이터 처리
	                    Map<String, Object> row = new HashMap<>();
	                    for (int i=0; i<headerList.size(); i++) {
	                        row.put(headerList.get(i), data[i].trim());
	                    }
//	                    System.out.println("행 ========================= " + row);
	                    
	                    // DB에 저장
	                    String car_num = (String)row.get("차량");
	                    String date = (String)row.get("일자");
	                    String time = (String)row.get("시간");
	                    int rpm = Integer.parseInt((String) row.get("rpm"));
	                    gisMapper.insertData_rpm(car_num, date, time, rpm);
	                }
	            }
	        } catch (IOException e) {
	            e.printStackTrace();
	        }
		}
		
		// noise 파일
		for(MultipartFile file:file_noise) {
			// 파일을 읽기 위해 먼저 디렉토리에 저장
			// 특정 경로를 가지는 File 객체를 생성
			File sFile = new File("C:\\CleanYongin\\" + file.getOriginalFilename());
			try {
				// transferTo() : 지정한 경로에 파일을 저장
				file.transferTo(sFile);
			} catch (IllegalStateException e) {
				e.printStackTrace();
			} catch (IOException e) {
				e.printStackTrace();
			}
			
	        String line;      
	        List<String> headerList = null;
	        
	        // 저장된 파일 읽어오기
	        //	charset 기본 설정이 utf-8이어서 한글 깨짐 발생한다 
	        // 	파일의 인코딩에 맞는 charset 설정이 필요
	        try (BufferedReader br = new BufferedReader(new FileReader("C:\\CleanYongin\\" + file.getOriginalFilename(), Charset.forName("EUC-KR")))) {        	
	        	// readLine() : 파일의 한 줄을 가져와 문자열로 반환
	            while ((line = br.readLine())!=null) {            	
	            	// split() : 특정 문자를 기준으로 문자열을 나누어 배열을 반환
	                String[] data = line.split(",");
//	                System.out.println("[배열의 타입; @배열 객체의 해시 코드 == " + data);

	                if (headerList==null) {
	                    // 헤더 데이터 처리
	                	headerList = new ArrayList<>();
	                    for (String header:data) {
	                    	headerList.add(header.trim());
	                    }
//	                    System.out.println("헤더 리스트  =================== " + headerList);
	                } 
	                else {
	                    // 행 데이터 처리
	                    Map<String, Object> row = new HashMap<>();
	                    for (int i=0; i<headerList.size(); i++) {
	                        row.put(headerList.get(i), data[i].trim());
	                    }
//	                    System.out.println("행 ========================= " + row);
	                    
	                    // DB에 저장
	                    String car_num = (String)row.get("차량");
	                    String date = (String)row.get("일자");
	                    String time = (String)row.get("시간");
	                    int noise = Integer.parseInt((String) row.get("소음"));
	                    gisMapper.insertData_noise(car_num, date, time, noise);
	                }
	            }
	        } catch (IOException e) {
	            e.printStackTrace();
	        }
		}
		
		// temp 테이블의 데이터를 points 테이블로 삽입
		gisMapper.insertTempToPoints();
		
		// temp 테이블의 데이터 삭제
		gisMapper.deleteTemp_gps();
		gisMapper.deleteTemp_rpm();
		gisMapper.deleteTemp_noise();
		
		// course 테이블 초기화
		gisMapper.deleteCourse();
		
		// points 테이블의 데이터를 course 테이블로 삽입
		gisMapper.insertCourse();
	}

	@Override
	public Map<String, Object> getChart(String car_num, String beginDate, String endDate) {
		Map<String, Object> map = new HashMap<String, Object>();
		
		map.put("chart", gisMapper.getChart(car_num, beginDate, endDate));
		return map;
	}
	
}
