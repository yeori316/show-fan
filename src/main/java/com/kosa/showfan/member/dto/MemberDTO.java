package com.kosa.showfan.member.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.sql.Date;

@Data

public class MemberDTO {
    private Long MemberId;
    private String MemberEmail;
    private String MemberPwd;
    private String MemberNickname;
    private String MemberImage;
    private String MemberEmailAlert;
    private Date MemberCreatedAt;
    private Date MemberDeletedAt;
    private Integer MemberTotalPrice;
    private Integer MemberStatusId;
}
