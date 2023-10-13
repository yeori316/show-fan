package com.kosa.showfan.review.dto;

import lombok.Data;

@Data
public class ReviewDTO {
	private Long reviewId;
	private Long memberId;
	private String showId;
	private Float reviewGrade;
	private String reviewContent;
	private Integer seatId;
}