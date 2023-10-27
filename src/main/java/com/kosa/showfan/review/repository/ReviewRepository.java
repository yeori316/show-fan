package com.kosa.showfan.review.repository;

import java.io.InputStream;
import java.lang.module.FindException;
import java.util.List;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.springframework.stereotype.Repository;

import com.kosa.showfan.exception.DeleteException;
import com.kosa.showfan.exception.InsertException;
import com.kosa.showfan.exception.SelectException;
import com.kosa.showfan.exception.UpdateException;
import com.kosa.showfan.review.dto.Review;
import com.kosa.showfan.review.dto.ReviewResponseDTO;
import com.kosa.showfan.review.dto.ReviewShowResponseDTO;

@Repository
public class ReviewRepository implements ReviewRepositoryInterface {
	
    private SqlSessionFactory sqlSessionFactory;

    public ReviewRepository() {
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
    public List<ReviewResponseDTO> selectByShowId(String showId) throws SelectException {
        SqlSession session = sqlSessionFactory.openSession();
        List<ReviewResponseDTO> list = session.selectList("com.kosa.showfan.review.ReviewMapper.selectByShowId",
                showId);
        return list;
    }

    @Override
    public List<ReviewShowResponseDTO> selectByMemberId(Long memberId) throws SelectException {
        SqlSession session = sqlSessionFactory.openSession();
        List<ReviewShowResponseDTO> list = session.selectList("com.kosa.showfan.review.ReviewMapper.selectByMemberId",
                memberId);
        return list;
    }

    @Override
    public void insertReview(Review review) throws InsertException {
        SqlSession session = null;
        try {
            session = sqlSessionFactory.openSession();
            session.insert("com.kosa.showfan.review.ReviewMapper.insertReview", review);
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
    public void updateReview(Review review) throws UpdateException {
        SqlSession session = null;
        try {
            session = sqlSessionFactory.openSession();
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
    public void deleteReview(Long review) throws DeleteException {
        SqlSession session = null;
        try {
            session = sqlSessionFactory.openSession();
            session.delete("com.kosa.showfan.review.ReviewMapper.deleteReview", review);
            session.commit();
        } catch (Exception e) {
            session.rollback();
            throw e;
        } finally {
            session.close();
        }
    }

    @Override
    public Review selectReviewById(Long reviewId) throws SelectException {
        SqlSession session = null;
        try {
            session = sqlSessionFactory.openSession();
            Review res = session.selectOne("com.kosa.showfan.review.ReviewMapper.selectReviewById", reviewId);
            session.commit();
            return res;
        } catch (Exception e) {
            session.rollback();
            throw new FindException(e.getMessage());
        } finally {
            if (session != null) {
                session.close();
            }
        }
    }
}
