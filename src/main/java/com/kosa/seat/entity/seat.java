package com.kosa.seat.entity;

import java.sql.Date;

import lombok.Data;

@Data
public class seat {

	private Long ReviewId;
	private Long memberId;
	private String content;
	private Date createAt;
	
}
