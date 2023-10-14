package com.kosa.showfan.show.show.service;

import java.util.List;

import com.kosa.showfan.exception.FindException;
import com.kosa.showfan.show.show.dao.ShowDAO;
import com.kosa.showfan.show.show.dao.ShowDAOImpl;
import com.kosa.showfan.show.show.dto.ShowCalendarDTO;
import com.kosa.showfan.show.show.dto.ShowDTO;
import com.kosa.showfan.show.show.dto.ShowListDTO;
import com.kosa.showfan.show.show.dto.ShowSearchDTO;
import com.kosa.showfan.show.show.dto.ShowAllInfoDTO;

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

	public List<ShowAllInfoDTO> selectByShowId(String showId) throws Exception {
		return showDAO.selectById(showId);
	}
	
	public List<ShowDTO> selectByConcept(Long genreId) throws Exception{
		return showDAO.selectByConcept(genreId);
	}
	
	public String selectByName(String name) throws FindException{
		return showDAO.selectByName(name);
	}
}
