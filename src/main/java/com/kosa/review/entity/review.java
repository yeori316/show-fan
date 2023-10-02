package com.kosa.review.entity;

import java.sql.Date;

import lombok.Data;

@Data
public class review {

	private Long id;
	private Long showId;
	private Long memberId;
	private Integer grade;
	private String content;
	private Date createdAt;
	
}
