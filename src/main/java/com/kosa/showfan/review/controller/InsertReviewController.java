package com.kosa.showfan.review.controller;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.kosa.showfan.review.dto.ReviewDTO;

public class InsertReviewController extends ReviewController {

	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setHeader("Access-Control-Allow-Credentials", "true");
		response.setContentType("application/json;charset=utf-8");
		Long showId = Long.parseLong(request.getParameter("showId"));
		Long memberId = Long.parseLong(request.getParameter("memberId"));
		Float reviewGrade = Float.parseFloat(request.getParameter("reviewGrade"));
		String reviewContent = request.getParameter("reviewContent");

		ReviewDTO reviewDTO = new ReviewDTO();
		reviewDTO.setShowId(showId);
		reviewDTO.setMemberId(memberId);
		reviewDTO.setReviewGrade(reviewGrade);
		reviewDTO.setReviewContent(reviewContent);

		service.insertReview(reviewDTO);
	}
}
