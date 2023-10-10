package com.kosa.showfan.reply.controller;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.kosa.showfan.reply.dto.ReplyDTO;

public class UpdateReplyController extends ReplyController {

	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setHeader("Access-Control-Allow-Credentials", "true");
		response.setContentType("application/json;charset=utf-8");

		Long replyId = Long.parseLong(request.getParameter("replyId"));

		ReplyDTO replyDTO = new ReplyDTO();
		replyDTO.setReplyId(replyId);
		service.updateReply(replyDTO);
	}
}
