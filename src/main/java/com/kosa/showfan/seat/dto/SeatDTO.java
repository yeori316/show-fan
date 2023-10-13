package com.kosa.showfan.seat.dto;

import lombok.Data;

@Data
public class SeatDTO {
	private Long seatPriceId;
	private Long showId;
	private String seatPriceSeatName;
	private Integer seatPricePrice;
}
