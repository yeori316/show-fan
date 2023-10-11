package com.kosa.showfan.myArtist.dao;

import com.kosa.showfan.exception.FindException;
import com.kosa.showfan.myArtist.dto.MyArtistDTO;

import java.util.List;

public interface MyArtistDAO {
    /**
     * 회원이 선호하는 아티스트 검색
     *
     * @param memberId
     * @return 아티스트 리스트
     * @throws FindException
     */
    List<MyArtistDTO> selectAllByMemberId(Long memberId) throws FindException;
}
