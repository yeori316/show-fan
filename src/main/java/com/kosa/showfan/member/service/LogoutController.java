package com.kosa.showfan.member.service;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@WebServlet("/logoutmem")
public class LogoutController extends HttpServlet {
	private static final long serialVersionUID = 1L;


	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		
		//크로스오리진 문제 해결
		response.setHeader("Access-Control-Allow-Origin", 
						    "http://192.168.1.112:5500");
		response.setHeader("Access-Control-Allow-Credentials" , "true");
		
		HttpSession session = request.getSession();
		System.out.println("in logout:" + session.getId());
		session.invalidate(); //세션 비활성화 
		
	}


}
