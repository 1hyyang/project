package com.cleanyongin.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

/*
 * Spring Interceptor
 * 	HTTP 요청 처리 과정에서 요청을 가로채고 처리 전후에 추가 작업을 수행
 * 	인터셉터는 컨트롤러(Controller)에 진입 전, 컨트롤러 실행 후, 뷰(View) 렌더링 전 등 
 * 	다양한 시점에서 동작하여 요청의 처리 흐름을 제어하거나 조작할 수 있다.
 */
@Component
public class LoginInterceptor implements HandlerInterceptor {
	
	/*
	 * 로그인이 되어 있지 않은 경우 로그인 페이지로 이동
	 * preHandle : 컨트롤러 실행 전 실행
	 * return
	 * 	true : 요청 컨트롤러 실행
	 * 	false : 요청 컨트롤러 실행하지 않음
	 */

	// /board/list로 접근하면 BoardController를 실행하기 전에 이 LoginInterceptor의 preHandle 메소드가 실행되어
	// 로그인한 상태에서만 목록을 조회하고 아닌 경우 로그인 페이지로 이동
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		HttpSession session = request.getSession();
		if(session.getAttribute("id")!=null && !session.getAttribute("id").toString().equals("")) {
			return true;
		} else {
			response.sendRedirect("/login");
			return false;
		}
	}
}

