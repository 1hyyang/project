package com.cleanyongin.test;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.cleanyongin.mapper.GisMapper;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration("file:src/main/webapp/WEB-INF/spring/root-context.xml")
public class GisMapperTest {

	@Autowired
	GisMapper gisMapper;
	
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
		System.out.println("==============" + gisMapper.getCleanTimeRatio("2023-09-05", "114하6585"));
	}
}
