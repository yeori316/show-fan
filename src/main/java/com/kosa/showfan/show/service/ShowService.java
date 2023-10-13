package com.kosa.showfan.show.service;

import java.util.List;

import com.kosa.showfan.exception.FindException;
import com.kosa.showfan.show.dao.ShowDAO;
import com.kosa.showfan.show.dao.ShowDAOImpl;
import com.kosa.showfan.show.dto.ShowCalendarDTO;
import com.kosa.showfan.show.dto.ShowDTO;
import com.kosa.showfan.show.dto.ShowListDTO;
import com.kosa.showfan.show.dto.ShowSearchDTO;
import com.kosa.showfan.show.dto.showAllInfoDTO;

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
	
	public ShowListDTO calendar() throws FindException {
		List<ShowCalendarDTO> list = showDAO.selectByDate();
		return new ShowListDTO<>(list.size(), list);
	}

	public List<showAllInfoDTO> selectByShowId(String showId) throws Exception {
		return showDAO.selectById(showId);
	}
	
	public List<ShowDTO> selectByConcept(Long genreId) throws Exception{
		return showDAO.selectByConcept(genreId);
	}
	
	public String selectByName(String name) throws FindException{
		return showDAO.selectByName(name);
	}
}
