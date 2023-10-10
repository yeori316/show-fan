package com.kosa.showfan.review.service;

import java.util.List;

import com.kosa.showfan.exception.AddException;
import com.kosa.showfan.exception.FindException;
import com.kosa.showfan.exception.ModifyException;
import com.kosa.showfan.exception.RemoveException;
import com.kosa.showfan.review.dao.ReviewDAO;
import com.kosa.showfan.review.dto.ReviewDTO;

public class ReviewService {
	private ReviewDAO reviewDAO;

	public List<ReviewDTO> getSelectByShowId(ReviewDTO review) throws FindException {
		return reviewDAO.selectByShowId(review);
	}

	public void insertReview(ReviewDTO reviewDTO) {
		try {
			reviewDAO.insertReview(reviewDTO);
		} catch (AddException e) {
			e.printStackTrace();
		}
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

	public static ReviewService getInstance() {
		return null;
	}
}
