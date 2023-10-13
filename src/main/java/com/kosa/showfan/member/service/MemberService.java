package com.kosa.showfan.member.service;

import com.kosa.showfan.exception.FindException;
import com.kosa.showfan.member.dao.MemberDAO;
import com.kosa.showfan.member.dao.MemberDAOImpl;
import com.kosa.showfan.member.dto.MemberDTO;

public class MemberService {
    private MemberDAO member;

    public MemberService() {
        member = new MemberDAOImpl();
    }

    private static final MemberService instance = new MemberService();

    public static MemberService getInstance() {
        return instance;
    }

    /**
     * 아이디와 비밀번호에 해당하는 고객정보가 존재한다면 반환값이 없고 존재하지 않으면 FindException발생
     *
     * @param email
     * @param pwd
     * @throws FindException
     */
    public void login(String email, String pwd) throws FindException {

        MemberDTO m = member.selectById(email, pwd);
        if (!m.getMemberPwd().equals(pwd)) {
            throw new FindException();
        }

    }

    public MemberDTO select(String email) throws FindException {
        return member.selectByEmail(email);
    }
}
