package com.kosa.showfan.review.controller;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.kosa.showfan.review.dto.ReviewDTO;

public class UpdateReviewController extends ReviewController {

	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setHeader("Access-Control-Allow-Credentials", "true");
		response.setContentType("application/json;charset=utf-8");

		Long reviewId = Long.parseLong(request.getParameter("reviewId"));

		ReviewDTO reviewDTO = new ReviewDTO();
		reviewDTO.setReviewId(reviewId);

		service.updateReview(reviewDTO);
	}
}
