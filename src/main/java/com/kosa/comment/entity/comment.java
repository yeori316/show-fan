package com.kosa.comment.entity;

import java.sql.Date;

import lombok.Data;

@Data
public class comment {
	
	private Long id;
	private Long showId;
	private String seatName;
	private Integer price;
	
}
