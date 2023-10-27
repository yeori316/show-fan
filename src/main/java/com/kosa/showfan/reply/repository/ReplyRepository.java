package com.kosa.showfan.reply.repository;

import java.io.InputStream;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.springframework.stereotype.Repository;

import com.kosa.showfan.exception.DeleteException;
import com.kosa.showfan.exception.InsertException;
import com.kosa.showfan.exception.UpdateException;
import com.kosa.showfan.reply.dto.Reply;

@Repository
public class ReplyRepository implements ReplyRepositoryInterface {
	
	private SqlSessionFactory sqlSessionFactory;

	public ReplyRepository() {
		String resource = "mybatis-config.xml";
		InputStream inputStream;
		try {
			inputStream = Resources.getResourceAsStream(resource);
			sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	public void insertReply(Reply reply) throws InsertException {
		SqlSession session = null;
		try {
			session = sqlSessionFactory.openSession();
			session.insert("com.kosa.showfan.reply.ReplyMapper.insertReply", reply);
			session.commit();
		} catch (Exception e) {
			session.rollback();
			throw new InsertException(e.getMessage());
		} finally {
			if (session != null) {
				session.close();
			}
		}
	}

	@Override
	public void updateReply(Reply reply) throws UpdateException {
		SqlSession session = null;
		try {
			session = sqlSessionFactory.openSession();
			session.update("com.kosa.showfan.reply.ReplyMapper.updateReply", reply);
			session.commit();
		} catch (Exception e) {
			session.rollback();
			throw e;
		} finally {
			session.close();
		}
	}

	@Override
	public void deleteReply(Long replyId) throws DeleteException {
		SqlSession session = null;
		try {
			session = sqlSessionFactory.openSession();
			session.delete("com.kosa.showfan.reply.ReplyMapper.deleteReply", replyId);
			session.commit();
		} catch (Exception e) {
			session.rollback();
			throw e;
		} finally {
			session.close();
		}
	}
}
