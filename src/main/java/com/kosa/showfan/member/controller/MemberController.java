package com.kosa.showfan.member.controller;

import com.google.gson.Gson;
import com.kosa.showfan.controller.Controller;
import com.kosa.showfan.exception.FindException;
import com.kosa.showfan.member.dto.MemberDTO;
import com.kosa.showfan.member.service.MemberService;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

public class MemberController implements Controller {
    protected MemberService service;

    public MemberController() {
        service = MemberService.getInstance();
    }

    @Override
    public void execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        if (request.getMethod().equals("GET")) {
            PrintWriter out = response.getWriter();
            Gson gson = new Gson();
            MemberDTO member;
            try {
                member = service.select(Long.valueOf(request.getParameter("memberId")));
                String jsonResult = gson.toJson(member);
                out.print(jsonResult);
            } catch (FindException e) {
                e.printStackTrace();
                response.setStatus(404);
            } catch (Exception e) {
                e.printStackTrace();
                response.setStatus(500);
            }
        }
    }
}
