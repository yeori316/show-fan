package com.kosa.showfan.show.dao;

import java.util.List;

import com.kosa.showfan.show.dto.ShowDTO;

public interface ShowDAO {
	public void selectById() throws Exception;

	List<ShowDTO> selectAll() throws Exception;
}
