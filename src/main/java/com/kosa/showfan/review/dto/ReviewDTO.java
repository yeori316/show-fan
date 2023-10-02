package com.kosa.showfan.review.dto;

import java.util.Date;

import lombok.Data;

@Data
public class ReviewDTO {
	private Long id;
	private Long showId;
	private Long memberId;
	private Integer grade;
	private String content;
	private Date createdAt;
}
