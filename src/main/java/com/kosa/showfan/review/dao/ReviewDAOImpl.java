package com.kosa.showfan.review.dao;

import java.io.InputStream;
import java.util.List;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

import com.kosa.showfan.exception.AddException;
import com.kosa.showfan.exception.FindException;
import com.kosa.showfan.exception.ModifyException;
import com.kosa.showfan.exception.RemoveException;
import com.kosa.showfan.review.dto.ReviewDTO;

public class ReviewDAOImpl implements ReviewDAO {
	private static final ReviewDAO reviewDAO = new ReviewDAOImpl();
	private SqlSessionFactory sqlSessionFactory;

	public static ReviewDAO getInstance() {
		return reviewDAO;
	}

	public ReviewDAOImpl() {
		String resource = "com/kosa/showfan/sql/mybatis-config.xml";
		InputStream inputStream;
		try {
			inputStream = Resources.getResourceAsStream(resource);
			sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	public List<ReviewDTO> selectByShowId(String showId) throws FindException {
		SqlSession session = sqlSessionFactory.openSession();
		List<ReviewDTO> list = session.selectList("com.kosa.showfan.review.ReviewMapper.selectByShowId", showId);
		return list;
	}

	@Override
	public void insertReview(ReviewDTO review) throws AddException {
		SqlSession session = null;
		try {
			session = sqlSessionFactory.openSession();
			session.insert("com.kosa.showfan.review.ReviewMapper.insertReview", review);
			session.commit();
		} catch (Exception e) {
			session.rollback();
			throw new AddException(e.getMessage());
		} finally {
			if (session != null) {
				session.close();
			}
		}
	}

	@Override
	public void updateReview(ReviewDTO review) throws ModifyException {
		SqlSession session = sqlSessionFactory.openSession();
		try {
			session.update("com.kosa.showfan.review.ReviewMapper.updateReview", review);
			session.commit();
		} catch (Exception e) {
			session.rollback();
			throw e;
		} finally {
			session.close();
		}
	}

	@Override
	public void deleteReview(ReviewDTO review) throws RemoveException {
		SqlSession session = sqlSessionFactory.openSession();
		try {
			session.delete("com.kosa.showfan.review.ReviewMapper.deleteReview", review);
			session.commit();
		} catch (Exception e) {
			session.rollback();
			throw e;
		} finally {
			session.close();
		}
	}
}
