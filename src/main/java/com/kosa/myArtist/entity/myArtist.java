package com.kosa.myArtist.entity;

import lombok.Data;

@Data
public class myArtist {

	private Long artistId;
	private Long memberId;
	private Long viewCount;
	private Integer avgCount;
}
