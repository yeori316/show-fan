package com.kosa.showfan.review.dto;

import java.util.Date;
import java.util.List;

import com.kosa.showfan.reply.dto.ReplyDTO;

import lombok.Data;

@Data
public class ReviewDTO {
	private Long reviewId;
	private Long memberId;
	private String showId;
	private Float reviewGrade;
	private String reviewContent;
	private Date reviewCreatedAt;
	private String reviewIsModified;
	private Integer SeatId;
	private List<ReplyDTO> reviewReply;
}