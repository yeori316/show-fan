package com.kosa.showfan.reply.repository;

import com.kosa.showfan.exception.DeleteException;
import com.kosa.showfan.exception.InsertException;
import com.kosa.showfan.exception.UpdateException;
import com.kosa.showfan.reply.dto.Reply;

public interface ReplyRepositoryInterface {
	
	/**
	 * 답글 달기
	 * 
	 * @param reply
	 * @throws AddException
	 */
	void insertReply(Reply reply) throws InsertException;

	/**
	 * 답글 수정
	 * 
	 * @param reply
	 * @throws ModifyException
	 */
	void updateReply(Reply reply) throws UpdateException;

	/**
	 * 답글 삭제
	 * 
	 * @param reply
	 * @throws RemoveException
	 */
	void deleteReply(Long replyId) throws DeleteException;
}
