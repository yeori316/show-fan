package com.kosa.showfan.seatprice.dto;

import lombok.Data;

@Data
public class SeatPriceDTO {
	private Long seatPriceId;
	private Long showId;
	private String seatPriceSeatName;
	private Integer seatPricePrice;
}
