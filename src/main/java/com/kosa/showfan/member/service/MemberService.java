package com.kosa.showfan.member.service;

import java.lang.module.FindException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kosa.showfan.exception.InsertException;
import com.kosa.showfan.exception.SelectException;
import com.kosa.showfan.exception.UpdateException;
import com.kosa.showfan.member.dto.Member;
import com.kosa.showfan.member.repository.MemberRepository;

@Service
public class MemberService implements MemberServiceInterface{
	
	@Autowired
	private MemberRepository repository;

	/**
	 * 아이디와 비밀번호에 해당하는 고객정보가 존재한다면 반환값이 없고 존재하지 않으면 FindException발생
	 *
	 * @param email
	 * @param pwd
	 * @throws FindException
	 */
	public void login(String email, String pwd) throws SelectException {

		Member m = repository.selectById(email, pwd);
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
    public void signup(Member m, List<Long> genreList) throws InsertException {
    		try {
    				repository.insertMember(m, genreList);
			} catch (Exception e) {
				e.printStackTrace();
			}
    		
    }

    /**
     * 닉네임 중복 버튼을 클릭시 닉네임이 있는지 확인, 있으면 중복이고 없다면 FindException발생
     * @param nickname 사용하고 싶은 닉네임
     * @throws FindException
     */
	public String nickNameDupChk(String nickname) throws SelectException {
		String num = repository.selectByNickName(nickname);
		return num;
		
	}
	/**
	 * 내정보 수정
	 * @param m 변경할 멤버 정보를 담은 멤버 객체
	 * @param genreList 변경할 선호장르를 담은 리스트
	 * @throws Exception
	 */
	public void modify(Member m, List<Long> genreList) throws UpdateException{
		repository.updateMember(m, genreList);
	}
    
	

	public Member select(String email) throws SelectException {
		return repository.selectByEmail(email);
	}

}
