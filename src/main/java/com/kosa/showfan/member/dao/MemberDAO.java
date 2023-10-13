package com.kosa.showfan.member.dao;

import com.kosa.showfan.exception.FindException;
import com.kosa.showfan.member.dto.MemberDTO;

public interface MemberDAO {

    /**
     * 아이디 비번에 해당하는 회원을 검색한다
     *
     * @param email 이메일
     * @param pwd   패스워드
     * @return 멤버객체
     * @throws FindException 이메일과 패스워드에 해당하는 고객이 없거나 DB와 연결 실패하면 예외발생
     */
    public MemberDTO selectById(String email, String pwd) throws FindException;

    public MemberDTO selectByEmail(String email) throws FindException;
}
