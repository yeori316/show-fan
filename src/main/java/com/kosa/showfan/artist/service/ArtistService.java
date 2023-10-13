package com.kosa.showfan.artist.service;

import com.kosa.showfan.artist.dao.ArtistDAO;
import com.kosa.showfan.artist.dao.ArtistDAOImpl;
import com.kosa.showfan.artist.dto.ArtistDTO;
import com.kosa.showfan.exception.FindException;

public class ArtistService {
    private static final ArtistService instance = new ArtistService();
    private ArtistDAO artistDAO = ArtistDAOImpl.getInstance();

    public static ArtistService getInstance() {
        return instance;
    }

    public ArtistDTO selectById(Long artistId) throws FindException {
        return artistDAO.selectById(artistId);
    }

}
