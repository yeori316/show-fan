package com.kosa.showfan.show.dao;

import java.io.InputStream;
import java.util.List;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

import com.kosa.showfan.exception.FindException;
import com.kosa.showfan.show.dto.ShowCalendarDTO;
import com.kosa.showfan.show.dto.ShowDTO;
import com.kosa.showfan.show.dto.ShowSearchDTO;


public class ShowDAOImpl implements ShowDAO {
	private static final ShowDAO showDAO = new ShowDAOImpl();
	
	public static ShowDAO getInstance() {
		return showDAO;
	}
	
	private SqlSessionFactory sqlSessionFactory;
	
	public ShowDAOImpl() {
		String resource = "com/kosa/showfan/sql/mybatis-config.xml";
		InputStream inputStream;
		try {
			inputStream = Resources.getResourceAsStream(resource);
			sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
		}catch(Exception e) {
			e.printStackTrace();
		}
	}
	
	@Override
	public void selectById() throws Exception {
		SqlSession session = null;
		try {
			session = sqlSessionFactory.openSession();
			ShowDTO c = 
					(ShowDTO)session.selectOne("com.kosa.show.ShowMapper.selectById",  2);
			if(c != null) { 
				System.out.println(c);
			}else {
				throw new Exception("공연정보가 없습니다");
			}

		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception(e.getMessage());
		}finally {
			if(session != null) {
				session.close();
			}
		}
		
	}
	
	@Override
	public List<ShowDTO> selectAll() throws Exception {
		SqlSession session = null;
		try {
			session = sqlSessionFactory.openSession();
			List result = session.selectList("com.kosa.show.ShowMapper.selectAll");
			if(result != null) { 
				return result;
			}else {
				throw new Exception("공연정보가 없습니다");
			}

		} catch (Exception e) {
			e.printStackTrace();
 
		}finally {
			if(session != null) {
				session.close();
			}
		}
		return null;
		
	}

	@Override
	public List<ShowSearchDTO> selectByString(String value) throws FindException {
		SqlSession session = null;
		
		try {
			session = sqlSessionFactory.openSession();
			return session.selectList("com.kosa.show.ShowMapper.selectByString", value);
		} catch (Exception e) {
			throw new FindException("검색된 결과가 없습니다.");
		} finally {
			if (session != null) {
				session.close();
			}
		}
	}

	@Override
	public List<ShowCalendarDTO> selectByDate(String yymm) throws FindException {
		SqlSession session = null;
		
		try {
			session = sqlSessionFactory.openSession();
			return session.selectList("com.kosa.show.ShowMapper.selectByDate", yymm);
		} catch (Exception e) {
			throw new FindException("검색된 결과가 없습니다.");
		} finally {
			if (session != null) {
				session.close();
			}
		}
	}

}
