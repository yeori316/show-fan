package com.kosa.showfan.seat.dto;

import java.sql.Date;

import lombok.Data;

@Data
public class SeatDTO {
	private Long ReviewId;
	private Long memberId;
	private String content;
	private Date createAt;
}
