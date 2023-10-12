package com.kosa.showfan.member.service;

import java.util.List;

import com.kosa.showfan.exception.AddException;
import com.kosa.showfan.exception.FindException;
import com.kosa.showfan.member.dao.MemberDAO;
import com.kosa.showfan.member.dao.MemberDAOImpl;
import com.kosa.showfan.member.dto.MemberDTO;

public class MemberService {
    private MemberDAO member;

    public MemberService() {
        member = new MemberDAOImpl();
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
    /**
     * 
     * @param m
     * @param genreList
     * @throws AddException
     */
    public void signup(MemberDTO m, List<Long> genreList) throws AddException {
    		try {
    				member.insertMember(m, genreList);
			} catch (AddException e) {
				e.printStackTrace();
			}
    		
    }

    /**
     * 닉네임 중복 버튼을 클릭시 닉네임이 있는지 확인 있으면 중복이고 없다면 FindException발생
     * @param nickname
     * @throws FindException
     */
	public void nickNameDupChk(String nickname) throws FindException {
		member.selectByNickName(nickname);
		
	}
    
    
}
