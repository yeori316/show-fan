package com.kosa.showfan.member.dao;

import com.kosa.showfan.exception.FindException;
import com.kosa.showfan.member.dto.MemberDTO;
import org.apache.ibatis.session.SqlSession;

public class MemberDAOImpl implements MemberDAO {
    private static final MemberDAO memberDAO = new MemberDAOImpl();

    public static MemberDAO getInstance() {
        return memberDAO;
    }

    @Override
    public MemberDTO select(Long memberId) throws FindException {
        SqlSession session = null;
        try {
            MemberDTO member = session.selectOne("com.kosa.show.memberMapper.select", memberId);
            return member;
        } catch (Exception e) {
            throw new FindException("회원 검색에 실패했습니다");
        } finally {
            if (session != null) {
                session.close();
            }
        }
    }
}