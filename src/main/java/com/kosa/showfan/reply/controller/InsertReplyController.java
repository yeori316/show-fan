package com.kosa.showfan.reply.controller;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.kosa.showfan.reply.dto.ReplyDTO;

public class InsertReplyController extends ReplyController {

	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setHeader("Access-Control-Allow-Origin", "http://192.168.3.103:5500");
		response.setHeader("Access-Control-Allow-Credentials", "true");
		response.setContentType("application/json;charset=utf-8");
		Long reviewId = Long.parseLong(request.getParameter("reviewId"));
		Long memberId = Long.parseLong(request.getParameter("memberId"));
		String replyContent = request.getParameter("replyContent");

		ReplyDTO replyDTO = new ReplyDTO();
		replyDTO.setReviewId(reviewId);
		replyDTO.setMemberId(memberId);
		replyDTO.setReplyContent(replyContent);
		service.insertReply(replyDTO);
	}
}
