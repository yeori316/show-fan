package com.kosa.showfan.review.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.kosa.showfan.review.dto.ReviewResponseDTO;

public class MemberReviewController extends ReviewController {

	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		System.out.println("??");
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setHeader("Access-Control-Allow-Credentials", "true");
		response.setContentType("application/json;charset=utf-8");

		System.out.println("memberReviewController");
		PrintWriter out = response.getWriter();
		Long memberId = Long.parseLong(request.getParameter("memberId"));

		try {
			List<ReviewResponseDTO> result = service.getSelectByMemberId(memberId);
			Gson gson = new Gson();
			String jsonResult = gson.toJson(result);
			out.print(jsonResult);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
