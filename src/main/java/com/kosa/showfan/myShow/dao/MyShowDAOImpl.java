package com.kosa.showfan.myShow.dao;

import com.kosa.showfan.exception.AddException;
import com.kosa.showfan.exception.FindException;
import com.kosa.showfan.exception.RemoveException;
import com.kosa.showfan.myShow.dto.MyShowDTO;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

import java.io.InputStream;
import java.util.List;

public class MyShowDAOImpl implements MyShowDAO {
    private static final MyShowDAO myShowDAO = new MyShowDAOImpl();

    public static MyShowDAO getInstance() {
        return myShowDAO;
    }

    private SqlSessionFactory sqlSessionFactory;

    public MyShowDAOImpl() {
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
    public void insertMyShow(MyShowDTO myShowDTO) throws AddException {
        SqlSession session = null;
        try {
            session = sqlSessionFactory.openSession();
            session.insert("com.kosa.show.MyShowMapper.insertMyShow", myShowDTO);
        } catch (Exception e) {
            e.printStackTrace();
            throw new AddException("찜 목록 추가에 실패했습니다");
        } finally {
            if (session != null) {
                session.commit();
                session.close();
            }
        }
    }

    @Override
    public void deleteMyShow(MyShowDTO myShowDTO) throws RemoveException {
        SqlSession session = null;
        try {
            session = sqlSessionFactory.openSession();
            session.delete("com.kosa.show.MyShowMapper.deleteMyShow", myShowDTO);
        } catch (Exception e) {
            throw new RemoveException("찜 목록 삭제에 실패했습니다");
        } finally {
            if (session != null) {
                session.commit();
                session.close();
            }
        }
    }

    @Override
    public List<MyShowDTO> selectAllByMemberId(Long memberId) throws FindException {
        SqlSession session = null;
        try {
            session = sqlSessionFactory.openSession();
            List<MyShowDTO> myShowDTOList = session.selectList("com.kosa.show.MyShowMapper.selectAllByMemberId", memberId);
            return myShowDTOList;
        } catch (Exception e) {
            e.printStackTrace();
            throw new FindException("찜 목록 검색에 실패했습니다");
        } finally {
            if (session != null) {
                session.close();
            }
        }
    }
}
