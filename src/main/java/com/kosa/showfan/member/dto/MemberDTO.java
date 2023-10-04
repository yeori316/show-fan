package com.kosa.showfan.member.dto;

import java.sql.Date;

import lombok.Data;

@Data
public class MemberDTO {
	private Long MemberId;
	private String MemberEmail;
	private String MemberPwd;
	private String MemberNickName;
	private String MemberImage;
	private String MemberEmailAlert;
	private Date MemberCreatedAt;
	private Date MemberDeletedAt;
	private Integer MemberTotalPrice;
	private Integer MemberStatusId;
}
