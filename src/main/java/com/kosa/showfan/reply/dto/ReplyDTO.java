package com.kosa.showfan.reply.dto;

import lombok.Data;

@Data
public class ReplyDTO {
	private Long id;
	private Long showId;
	private String seatName;
	private Integer price;
}
