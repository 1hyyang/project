package com.cleanyongin.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.cleanyongin.vo.CarVO;
import com.cleanyongin.vo.PointsVO;
import com.cleanyongin.vo.UserVO;

public interface GisMapper {
	
	public int login(UserVO user);
	public List<CarVO> getCarListAll();
	public List<CarVO> getCarList(String car_area);
	public List<PointsVO> getDateList(String car_num);
	public PointsVO getCleanTimeRatio(@Param("car_num") String car_num, @Param("date") String date);
	public PointsVO getCenter(@Param("car_num") String car_num, @Param("date") String date);
	public int insertCar(@Param("car_num") String car_num, @Param("car_type") String car_type, @Param("car_area") String car_area);
	public int insertData_gps(@Param("car_num") String car_num, @Param("date") String date, @Param("time") String time, @Param("longitude") String longitude, @Param("latitude") String latitude);
	public int insertData_rpm(@Param("car_num") String car_num, @Param("date") String date, @Param("time") String time, @Param("rpm") int rpm);
	public int insertData_noise(@Param("car_num") String car_num, @Param("date") String date, @Param("time") String time, @Param("noise") int noise);
	public int insertTempToPoints();
	public int deleteTemp_gps();
	public int deleteTemp_rpm();
	public int deleteTemp_noise();
	public int deleteCourse();
	public int insertCourse();
	public List<PointsVO> getChart(@Param("car_num") String car_num, @Param("beginDate") String beginDate, @Param("endDate") String endDate);
	
}
