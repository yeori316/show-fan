package com.kosa.showfan.review.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.kosa.showfan.review.dto.ReviewDTO;

public class SelectReviewController extends ReviewController {

	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setHeader("Access-Control-Allow-Origin", "http://192.168.3.103:5500");
		response.setHeader("Access-Control-Allow-Credentials", "true");
		response.setContentType("application/json;charset=utf-8");
		PrintWriter out = response.getWriter();
		try {
			List<ReviewDTO> result = service.getSelectByShowId(null);
			Gson gson = new Gson();
			String jsonResult = gson.toJson(result);
			out.print(jsonResult);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}