package com.kosa.showfan.member.dao;

import java.io.InputStream;
import java.sql.Connection;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

import com.kosa.showfan.exception.FindException;
import com.kosa.showfan.member.dto.MemberDTO;

public class MemberDAOImpl implements MemberDAO {
	private SqlSessionFactory sqlSessionFactory;
	public MemberDAOImpl() {
		String resource = "com/kosa/showfan/sql/mybatis-config.xml";
//		String resource = "com/kosa/showfan/mybatis-config.xml";
		   InputStream inputStream;
		   try {
			inputStream = Resources.getResourceAsStream(resource);
			sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
			
		   } catch (Exception e) {
			e.printStackTrace();
		   }
	}

	
	@Override
	public MemberDTO selectById(String email, String pwd) throws FindException {
		SqlSession session = null;
		try {
			session = sqlSessionFactory.openSession();
			Map<String, String> map = new HashMap<>();
			map.put("email", email);
			map.put("pwd", pwd);
			MemberDTO m = session.selectOne("com.kosa.showfan.MemberMapper.selectById", map);
	
			if(m!=null) {
				return m;
			}else {
				throw new FindException("회원이 없습니다");
			}

		}catch(Exception e) {
			e.printStackTrace();
			throw new FindException(e.getMessage());
			
		}finally {
			if(session != null) {
				session.close();
			}
		}
	}
	
	
	
	
	
	
	
	
	
}