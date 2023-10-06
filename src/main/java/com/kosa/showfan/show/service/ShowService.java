package com.kosa.showfan.show.service;

import java.util.List;

import com.kosa.showfan.show.dao.ShowDAO;
import com.kosa.showfan.show.dao.ShowDAOImpl;
import com.kosa.showfan.show.dto.ShowDTO;

public class ShowService {
	private ShowDAOImpl showDAO = new ShowDAOImpl();

	public List<ShowDTO> selectAll() throws Exception {
		return showDAO.selectAll();
	}
}
