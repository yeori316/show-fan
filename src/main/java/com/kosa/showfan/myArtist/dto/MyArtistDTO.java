package com.kosa.showfan.myArtist.dto;

import lombok.Data;

@Data
public class MyArtistDTO {
	private Long artistId;
	private Long memberId;
	private Integer myArtistViewCount;
	private Double myArtistAvgGrade;
}
