package com.kosa.showfan.member.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kosa.showfan.exception.FindException;
import com.kosa.showfan.member.service.MemberService;


//nicknamedupchk
public class NicknameDupChkServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private MemberService service;
	public NicknameDupChkServlet() {
		service = new MemberService();
	}

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		 
        //크로스오리진 문제 해결
        response.setHeader("Access-Control-Allow-Origin",
//        	"*");
        		"http://192.168.1.112:5502");
        response.setHeader("Access-Control-Allow-Credentials", "true");
        
        //응답형식
        response.setContentType("application/json;charset=utf-8");
        //응답출력스트림얻기
        PrintWriter out = response.getWriter();
        
        ObjectMapper mapper = new ObjectMapper();
        Map<String, Object> map = new HashMap<>();
        
        String nickname = request.getParameter("nickname");
        
        try {
			service.nickNameDupChk(nickname);
			System.out.println("닉네임 사용 가능!");
			map.put("status", 1);
		} catch (FindException e) {
			System.out.println("닉네임 사용 불가!");
			map.put("status", 0);
			e.printStackTrace();
		}
		
		
	}

}
