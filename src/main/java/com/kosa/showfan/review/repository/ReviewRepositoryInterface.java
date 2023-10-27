package com.kosa.showfan.review.repository;

import java.lang.module.FindException;
import java.util.List;

import com.kosa.showfan.exception.DeleteException;
import com.kosa.showfan.exception.InsertException;
import com.kosa.showfan.exception.SelectException;
import com.kosa.showfan.exception.UpdateException;
import com.kosa.showfan.review.dto.Review;
import com.kosa.showfan.review.dto.ReviewResponseDTO;
import com.kosa.showfan.review.dto.ReviewShowResponseDTO;

public interface ReviewRepositoryInterface {
    /**
     * 공연번호에 해당하는 리뷰들을 반환한다
     *
     * @param showId 공연번호
     * @return 리뷰들
     * @throws FindException
     */
    List<ReviewResponseDTO> selectByShowId(String showId) throws SelectException;

    /**
     * @param memberId
     * @return
     * @throws FindException
     */
    List<ReviewShowResponseDTO> selectByMemberId(Long memberId) throws SelectException;

    /**
     * 리뷰 추가
     *
     * @param review
     * @throws AddException
     */
    void insertReview(Review review) throws InsertException;

    /**
     * 리뷰 업데이트
     *
     * @param review
     * @throws ModifyException
     */
    void updateReview(Review review) throws UpdateException;

    /**
     * 리뷰 삭제
     *
     * @param reviewDTO
     * @throws RemoveException
     */
    void deleteReview(Long reviewId) throws DeleteException;

    Review selectReviewById(Long reviewId) throws SelectException;
}
