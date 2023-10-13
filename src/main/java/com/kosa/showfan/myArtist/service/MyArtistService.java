package com.kosa.showfan.myArtist.service;

import com.kosa.showfan.exception.FindException;
import com.kosa.showfan.myArtist.dao.MyArtistDAO;
import com.kosa.showfan.myArtist.dao.MyArtistDAOImpl;
import com.kosa.showfan.myArtist.dto.MyArtistDTO;

import java.util.List;

public class MyArtistService {
    private static final MyArtistService instance = new MyArtistService();
    private MyArtistDAO myArtistDAO = MyArtistDAOImpl.getInstance();

    public static MyArtistService getInstance() {
        return instance;
    }

    public List<MyArtistDTO> selectById(Long memberId) throws FindException {
        return myArtistDAO.selectAllByMemberId(memberId);
    }
}
