package com.kosa.showfan.reply.service;

import com.kosa.showfan.exception.AddException;
import com.kosa.showfan.exception.ModifyException;
import com.kosa.showfan.exception.RemoveException;
import com.kosa.showfan.reply.dao.ReplyDAO;
import com.kosa.showfan.reply.dto.ReplyDTO;

public class ReplyService {
	private ReplyDAO replyDAO;

	public void insertReply(ReplyDTO replyDTO) {
		try {
			replyDAO.insertReply(replyDTO);
		} catch (AddException e) {
			e.printStackTrace();
		}
	}

	public void updateReply(ReplyDTO replyDTO) {
		try {
			replyDAO.updateReply(replyDTO);
		} catch (ModifyException e) {
			e.printStackTrace();
		}
	}

	public void deleteReply(ReplyDTO replyDTO) {
		try {
			replyDAO.deleteReply(replyDTO);
		} catch (RemoveException e) {
			e.printStackTrace();
		}
	}

	public ReplyService getInstance() {
		return null;
	}
}
