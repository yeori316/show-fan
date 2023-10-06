package com.kosa.showfan.show.service;

import java.util.List;

import com.kosa.showfan.show.dao.ShowDAO;
import com.kosa.showfan.show.dao.ShowDAOImpl;
import com.kosa.showfan.show.dto.ShowDTO;

public class ShowService {
	private static final ShowService instance = new ShowService();
	private ShowDAO showDAO = ShowDAOImpl.getInstance();
	
	public static ShowService getInstance() {
		return instance;
	}

	public List<ShowDTO> selectAll() throws Exception {
		return showDAO.selectAll();
	}
}
