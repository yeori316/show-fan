package com.kosa.member.entity;

import java.sql.Date;

import lombok.Data;

@Data
public class member {

	private Long id;
	private String email;
	private String pwd;
	private String nickName;
	private String image;
	private Integer emailAlert;
	private Integer statusId;
	private Date createdAt;
	private Date deletedAt;
	private Integer avg_price;
	
}
