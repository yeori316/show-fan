package com.kosa.showfan.review.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kosa.showfan.exception.DeleteException;
import com.kosa.showfan.exception.InsertException;
import com.kosa.showfan.exception.SelectException;
import com.kosa.showfan.exception.UpdateException;
import com.kosa.showfan.review.dto.Review;
import com.kosa.showfan.review.dto.ReviewResponseDTO;
import com.kosa.showfan.review.dto.ReviewShowResponseDTO;
import com.kosa.showfan.review.repository.ReviewRepository;

@Service
public class ReviewService implements ReviewServiceInterface {
    
	@Autowired
    private ReviewRepository repository;

    
    public List<ReviewResponseDTO> getSelectByShowId(String showId) throws SelectException {
        return repository.selectByShowId(showId);
    }

    public List<ReviewShowResponseDTO> getSelectByMemberId(Long memberId) throws SelectException {
        return repository.selectByMemberId(memberId);
    }

    public void insertReview(Review reviewDTO) throws InsertException {
        repository.insertReview(reviewDTO);
    }

    public void updateReview(Review reviewDTO) throws UpdateException {
        try {
            repository.updateReview(reviewDTO);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void deleteReview(Long reviewId) throws DeleteException {
        try {
            repository.deleteReview(reviewId);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public Review selectReviewById(Long reviewId) throws SelectException {
        return repository.selectReviewById(reviewId);
    }
}
