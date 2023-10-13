package com.kosa.showfan.show.service;

import java.util.List;

import com.kosa.showfan.exception.FindException;
import com.kosa.showfan.show.dao.ShowDAO;
import com.kosa.showfan.show.dao.ShowDAOImpl;
import com.kosa.showfan.show.dto.ShowCalendarDTO;
import com.kosa.showfan.show.dto.ShowDTO;
import com.kosa.showfan.show.dto.ShowListDTO;
import com.kosa.showfan.show.dto.ShowSearchDTO;

public class ShowService {
	private static final ShowService instance = new ShowService();
	private ShowDAO showDAO = ShowDAOImpl.getInstance();
	
	public static ShowService getInstance() {
		return instance;
	}

	public List<ShowDTO> selectAll() throws Exception {
		return showDAO.selectAll();
	}
	
	public ShowListDTO search(String value) throws FindException {
		List<ShowSearchDTO> list = showDAO.selectByString(value);
		return new ShowListDTO<>(list.size(), list);
	}
	
	public ShowListDTO calendar(String yymm) throws FindException {
		List<ShowCalendarDTO> list = showDAO.selectByDate(yymm);
		return new ShowListDTO<>(list.size(), list);
	}
}
