package com.kosa.showfan.show.dao;

import java.util.List;

import com.kosa.showfan.exception.FindException;
import com.kosa.showfan.show.dto.ShowCalendarDTO;
import com.kosa.showfan.show.dto.ShowDTO;
import com.kosa.showfan.show.dto.ShowSearchDTO;

public interface ShowDAO {
	public void selectById() throws Exception;

	List<ShowDTO> selectAll() throws Exception;
	
	/**
	 * 공연명 검색
	 * @param value
	 * @return
	 * @throws FindException
	 */
	List<ShowSearchDTO> selectByString(String value) throws FindException;
	
	/**
	 * 캘린더에서 공연일정 조회
	 * @return
	 * @throws FindException
	 */
	List<ShowCalendarDTO> selectByDate(String yymm) throws FindException;
}
