package com.kosa.show.entity;

import java.sql.Date;

import lombok.Data;

@Data
public class show {

	private Long id;
	private Long genreId;
	private Integer showStatus;
	private String name;
	private Date startDay;
	private Date endDay;
	private Date runTime;
	private Date startTime;
	private Date endTime;
	private String age;
	private String address;
	private String venues;
	private String ticketingSite;
	private String text;
	private String story;
	private String[] images;
	
}
