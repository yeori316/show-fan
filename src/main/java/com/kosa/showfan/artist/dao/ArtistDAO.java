package com.kosa.showfan.artist.dao;

import com.kosa.showfan.artist.dto.ArtistDTO;
import com.kosa.showfan.exception.FindException;

public interface ArtistDAO {
    /**
     * 아티스트 검색
     *
     * @param artistId
     * @return 아티스트 DTO
     * @throws FindException
     */
    ArtistDTO selectById(Long artistId) throws FindException;

}
