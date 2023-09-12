package com.cleanyongin.test;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.cleanyongin.mapper.GisMapper;
import com.cleanyongin.vo.UserVO;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("file:src/main/webapp/WEB-INF/spring/root-context.xml")
public class GisMapperTest {

	@Autowired
	GisMapper gisMapper;
	
	@Test
	public void login() {
		UserVO user = new UserVO();
		user.setId("admin");
		user.setPw("rhksflwk");
		System.out.println("==============" + gisMapper.login(user));
	}
	
	@Test
	public void getCarList() {
		System.out.println("==============" + gisMapper.getCarList());
	}
	
	@Test
	public void getDateList() {
		System.out.println("==============" + gisMapper.getDateList("103하2414"));
	}

	@Test
	public void getCleanTimeRatio() {
		System.out.println("==============" + gisMapper.getCleanTimeRatio("114하6585", "2023-09-05"));
	}

	@Test
	public void getChart() {
		System.out.println("==============" + gisMapper.getChart("114하6585", "2023-09-05", "2023-09-07"));
	}
}
