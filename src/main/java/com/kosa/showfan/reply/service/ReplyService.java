package com.kosa.showfan.reply.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kosa.showfan.exception.DeleteException;
import com.kosa.showfan.exception.InsertException;
import com.kosa.showfan.exception.UpdateException;
import com.kosa.showfan.reply.dto.Reply;
import com.kosa.showfan.reply.repository.ReplyRepository;

@Service
public class ReplyService implements ReplyServiceInterface {

	@Autowired
	private ReplyRepository repository;


	public void insertReply(Reply replyDTO) throws InsertException {
		repository.insertReply(replyDTO);
	}

	public void updateReply(Reply replyDTO) throws UpdateException {
		try {
			repository.updateReply(replyDTO);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public void deleteReply(Long replyId) throws DeleteException {
		try {
			repository.deleteReply(replyId);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
