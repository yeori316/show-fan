package com.kosa.showfan.show.dao;

import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

import com.kosa.showfan.exception.FindException;
import com.kosa.showfan.show.dto.ShowAllInfoDTO;
import com.kosa.showfan.show.dto.ShowCalendarDTO;
import com.kosa.showfan.show.dto.ShowDTO;
import com.kosa.showfan.show.dto.ShowSearchDTO;

public class ShowDAOImpl implements ShowDAO {
	private static final ShowDAO showDAO = new ShowDAOImpl();
	private SqlSessionFactory sqlSessionFactory;

	public static ShowDAO getInstance() {
		return showDAO;
	}

	public ShowDAOImpl() {
		String resource = "com/kosa/showfan/sql/mybatis-config.xml";
		InputStream inputStream;
		try {
			inputStream = Resources.getResourceAsStream(resource);
			sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
//			System.out.println(sqlSessionFactory);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@Override
	public List<ShowAllInfoDTO> selectById(String id) throws Exception {
		SqlSession session = null;
		try {
			session = sqlSessionFactory.openSession();
			System.out.println(id);
			List<ShowAllInfoDTO> c = session.selectList("com.kosa.show.ShowMapper.selectById", id);
			if (c != null) {
				return c;
			} else {
				throw new Exception("공연정보가 없습니다");
			}

		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception(e.getMessage());
		} finally {
			if (session != null) {
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
			if (result != null) {
				return result;
			} else {
				throw new Exception("공연정보가 없습니다");
			}

		} catch (Exception e) {
			e.printStackTrace();

		} finally {
			if (session != null) {
				session.close();
			}
		}
		return null;

	}
	
	public Integer selectByStringCnt(String value) throws FindException {
		SqlSession session = null;
		
		try {
			session = sqlSessionFactory.openSession();
			return session.selectOne("com.kosa.show.ShowMapper.selectByStringCnt", value);
		} catch (Exception e) {
			throw new FindException("검색된 결과가 없습니다.");
		} finally {
			if (session != null) {
				session.close();
			}
		}
	}

	@Override
	public List<ShowSearchDTO> selectByString(String value, int startRn, int endRn) throws FindException {
		SqlSession session = null;

		try {
			session = sqlSessionFactory.openSession();
			
			Map<String, Object> map = new HashMap<>();
			map.put("value", value);
			map.put("startRn", startRn);
			map.put("endRn", endRn);
			
			return session.selectList("com.kosa.show.ShowMapper.selectByString", map);
		} catch (Exception e) {
			throw new FindException("검색된 결과가 없습니다.");
		} finally {
			if (session != null) {
				session.close();
			}
		}
	}
	
	@Override
	public String selectByName(String name) throws FindException {
		SqlSession session = null;

		try {
			session = sqlSessionFactory.openSession();
//			System.out.println(value);
			System.out.println(name);
			return session.selectOne("com.kosa.show.ShowMapper.selectByName", name);
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

	@Override
	public List<ShowDTO> selectByConcept(Long genreId) throws Exception {
		SqlSession session = null;
		System.out.println(genreId);
		try {
			session = sqlSessionFactory.openSession();
			return session.selectList("com.kosa.show.ShowMapper.selectByConcept",genreId);
			
		} catch (Exception e) {
			throw new FindException("검색된 결과가 없습니다.");
		} finally {
			if (session != null) {
				session.close();
			}
		}

	}

}
