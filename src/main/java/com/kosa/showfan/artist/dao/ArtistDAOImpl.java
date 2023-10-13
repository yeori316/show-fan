package com.kosa.showfan.artist.dao;

import com.kosa.showfan.artist.dto.ArtistDTO;
import com.kosa.showfan.exception.FindException;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

import java.io.InputStream;

public class ArtistDAOImpl implements ArtistDAO {

    private static final ArtistDAO artistDAO = new ArtistDAOImpl();

    public static ArtistDAO getInstance() {
        return artistDAO;
    }

    private SqlSessionFactory sqlSessionFactory;

    public ArtistDAOImpl() {
        String resource = "com/kosa/showfan/sql/mybatis-config.xml";
        InputStream inputStream;
        try {
            inputStream = Resources.getResourceAsStream(resource);
            sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public ArtistDTO selectById(Long artistId) throws FindException {
        SqlSession session = null;
        try {
            session = sqlSessionFactory.openSession();
            ArtistDTO artistDTO = session.selectOne("com.kosa.artist.ArtistMapper.selectById", artistId);
            return artistDTO;
        } catch (Exception e) {
            e.printStackTrace();
            throw new FindException("아티스트 검색에 실패했습니다");
        } finally {
            if (session != null) {
                session.close();
            }
        }
    }
}
