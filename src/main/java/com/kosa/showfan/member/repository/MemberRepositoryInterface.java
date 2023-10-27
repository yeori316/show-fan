package com.kosa.showfan.member.repository;

import java.util.List;

import com.kosa.showfan.exception.InsertException;
import com.kosa.showfan.exception.SelectException;
import com.kosa.showfan.exception.UpdateException;
import com.kosa.showfan.member.dto.Member;

public interface MemberRepositoryInterface {

    /**
     * 아이디 비번에 해당하는 회원을 검색한다
     *
     * @param email 이메일
     * @param pwd   패스워드
     * @return 멤버객체
     * @throws SelectException 이메일과 패스워드에 해당하는 고객이 없거나 DB와 연결 실패하면 예외발생
     */
    public Member selectById(String email, String pwd) throws SelectException;
    
    /**
     * 회원가입시 입력한 정보로 회원가입을 한다, 선호장르 값은 선호장르 테이블로 저장
     * @param m 회원가입시 입력한 정보를 담은 객체
     * @return
     * @throws InsertException
     */
    public void insertMember(Member m, List<Long> genreList) throws InsertException;

    /**
     * 회원가입시 닉네임 입력후 중복 체크 버튼을 클릭했을때 해당 닉네임을 검색한다 
     * @param nickname
     * @throws SelectException
     */
	public String selectByNickName(String nickname) throws SelectException;
	
	
	public void updateMember(Member m, List<Long> genreList) throws UpdateException;

    public Member selectByEmail(String email) throws SelectException;
}
