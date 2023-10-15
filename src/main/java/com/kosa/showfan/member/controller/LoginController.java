package com.kosa.showfan.member.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.google.gson.Gson;
import com.kosa.showfan.controller.Controller;
import com.kosa.showfan.exception.FindException;
import com.kosa.showfan.member.service.MemberService;

import javax.servlet.ServletException;
import javax.servlet.http.*;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;

public class LoginController extends HttpServlet implements Controller {
    private static final long serialVersionUID = 1L;
    private MemberService service;

    public LoginController() {
        service = new MemberService();
    }

	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		//응답형식
        response.setContentType("application/json;charset=utf-8");

        response.setHeader("Access-Control-Allow-Credentials", "true");

        //응답출력스트림얻기
        PrintWriter out = response.getWriter();
        Gson gson = new Gson();

        Map<String, Object> map = new HashMap<>();
        
        String email = request.getParameter("email");
        String pwd = request.getParameter("pwd");
        String auto = request.getParameter("autoLogin");

        HttpSession session = request.getSession();
        try {
            service.login(email, pwd);
            map.put("status", 1);
            map.put("msg", "로그인 성공");
            session.setAttribute("loginedEmail", email);
            session.setAttribute("loginedPwd", pwd);

            if (auto.equals("true")) {   //자동로그인을 체크한 경우
                Cookie cookie = new Cookie("loginCookie", (String) session.getAttribute("loginedEmail"));
                cookie.setMaxAge(60 * 60 * 24 * 7); // 단위는 (초)임으로 7일정도로 유효시간을 설정해 준다.
                cookie.setPath("/"); //모든 경로에서 접근 가능하도록 설정
                // 쿠키 적용
                response.addCookie(cookie);

            } else { //자동로그인을 체크 안한 경우
                Cookie cookie = new Cookie("loginCookie", (String) session.getAttribute("loginedEmail"));
//				cookie.setMaxAge(60*60*24*7); // 단위는 (초)임으로 7일정도로 유효시간을 설정해 준다.
                cookie.setPath("/"); //모든 경로에서 접근 가능하도록 설정
                // 쿠키 적용
                response.addCookie(cookie);
            }
        } catch (FindException e) {
            // TODO Auto-generated catch block
            e.printStackTrace
                    ();
            map.put("status", 0);
            map.put("msg", "로그인 실패");
        }
        String jsonStr = gson.toJson(map);
        out.print(jsonStr);

		
	}

}