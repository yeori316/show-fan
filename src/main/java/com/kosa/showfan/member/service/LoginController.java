package com.kosa.showfan.member.service;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kosa.showfan.exception.FindException;

@WebServlet("/loginmem")
public class LoginController extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private MemberService service;
   
    public LoginController() {
    		service = new MemberService();
    }

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		//응답형식
		response.setContentType("application/json;charset=utf-8");
		
		//크로스오리진 문제 해결
		response.setHeader("Access-Control-Allow-Origin", 
						    "http://192.168.1.112:5502");
		response.setHeader("Access-Control-Allow-Credentials" , "true");
		
		//응답출력스트림얻기
		PrintWriter out = response.getWriter();
		
		String email = request.getParameter("email");
		String pwd = request.getParameter("pwd");
		String auto = request.getParameter("autoLogin");
		
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> map = new HashMap<>();
		
		HttpSession session = request.getSession();
		
		try {
			if(auto == "true") {
				service.login(email, pwd);
				map.put("status", 1);
				map.put("msg", "로그인 성공");
				session.setAttribute("loginedEmail", email);
				session.setAttribute("loginedPwd", pwd);
				Cookie cookie = new Cookie("loginCookie", (String) session.getAttribute("loginedEmail"));
				cookie.setMaxAge(60*60*24*7); // 단위는 (초)임으로 7일정도로 유효시간을 설정해 준다.
				// 쿠키 적용
				response.addCookie(cookie);
			}
			else {
				service.login(email, pwd);
				map.put("status", 1);
				map.put("msg", "로그인 성공");
				session.setAttribute("loginedEmail", email);
				session.setAttribute("loginedPwd", pwd);
			}
		} catch (FindException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			map.put("status",  0);
			map.put("msg", "로그인 실패");
		}
		String jsonStr = mapper.writeValueAsString(map);
		out.print(jsonStr);
		
	}

}