package com.kosa.showfan.review.service;

import java.util.List;

import com.kosa.showfan.exception.AddException;
import com.kosa.showfan.exception.FindException;
import com.kosa.showfan.exception.ModifyException;
import com.kosa.showfan.exception.RemoveException;
import com.kosa.showfan.review.dao.ReviewDAO;
import com.kosa.showfan.review.dao.ReviewDAOImpl;
import com.kosa.showfan.review.dto.ReviewDTO;

public class ReviewService {
	private static final ReviewService service = new ReviewService();
	private ReviewDAO reviewDAO = ReviewDAOImpl.getInstance();

	public static ReviewService getInstance() {
		return service;
	}

	public List<ReviewDTO> getSelectByShowId(String showId) throws FindException {
		return reviewDAO.selectByShowId(showId);
	}

	public List<ReviewDTO> getSelectByMemberId(Long memberId) throws FindException {
		return reviewDAO.selectByMemberId(memberId);
	}

	public void insertReview(ReviewDTO reviewDTO) throws AddException {
//		try {
		reviewDAO.insertReview(reviewDTO);
//		} catch (AddException e) {
//			e.printStackTrace();
//		}
	}

	public void updateReview(ReviewDTO reviewDTO) {
		try {
			reviewDAO.updateReview(reviewDTO);
		} catch (ModifyException e) {
			e.printStackTrace();
		}
	}

	public void deleteReview(ReviewDTO reviewDTO) {
		try {
			reviewDAO.deleteReview(reviewDTO);
		} catch (RemoveException e) {
			e.printStackTrace();
		}
	}
}
