package com.kosa.showfan.member.service;

import com.kosa.showfan.exception.FindException;
import com.kosa.showfan.member.dao.MemberDAO;
import com.kosa.showfan.member.dao.MemberDAOImpl;
import com.kosa.showfan.member.dto.MemberDTO;

public class MemberService {
    private static final MemberService instance = new MemberService();
    private MemberDAO memberDAO = MemberDAOImpl.getInstance();

    public static MemberService getInstance() {
        return instance;
    }

    public MemberDTO select(Long memberId) throws FindException {
        return memberDAO.select(memberId);
    }
}
