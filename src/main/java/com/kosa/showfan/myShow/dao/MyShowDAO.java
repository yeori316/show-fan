package com.kosa.showfan.myShow.dao;

import com.kosa.showfan.exception.AddException;
import com.kosa.showfan.exception.FindException;
import com.kosa.showfan.exception.RemoveException;
import com.kosa.showfan.myShow.dto.MyShowDTO;

import java.util.List;

public interface MyShowDAO {
    /**
     * 찜 목록 추가
     *
     * @param myShowDTO
     * @throws AddException
     */
    void insertMyShow(MyShowDTO myShowDTO) throws AddException;

    /**
     * 찜 목록 삭제
     *
     * @param myShowDTO
     * @throws RemoveException
     */
    void deleteMyShow(MyShowDTO myShowDTO) throws RemoveException;

    /**
     * 회원의 찜 목록 검색
     *
     * @param memberId
     * @return 작품 리스트
     * @throws FindException
     */
    List<MyShowDTO> selectAllByMemberId(Long memberId) throws FindException;

}
