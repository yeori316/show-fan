package com.kosa.showfan.member.dao;

import com.kosa.showfan.exception.FindException;
import com.kosa.showfan.member.dto.MemberDTO;

public interface MemberDAO {
    MemberDTO select(Long memberId) throws FindException;
}
