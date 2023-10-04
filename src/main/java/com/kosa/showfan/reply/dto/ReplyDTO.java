package com.kosa.showfan.reply.dto;

import java.sql.Date;

import lombok.Data;

@Data
public class ReplyDTO {
	private Long replyId;
	private Long reviewId;
	private Long memberId;
	private String replyContent;
	private Date replyCreatedAt;
}
