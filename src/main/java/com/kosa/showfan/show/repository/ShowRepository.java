package com.kosa.showfan.show.repository;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.kosa.showfan.exception.DeleteException;
import com.kosa.showfan.exception.InsertException;
import com.kosa.showfan.exception.SelectException;
import com.kosa.showfan.show.dto.MyShowDTO;
import com.kosa.showfan.show.dto.Show;
import com.kosa.showfan.show.dto.ShowAllInfoDTO;
import com.kosa.showfan.show.dto.ShowCalendarDTO;
import com.kosa.showfan.show.dto.ShowGenreDTO;
import com.kosa.showfan.show.dto.ShowSearchDTO;

@Repository
public class ShowRepository implements ShowRepositoryInterface {

	@Override
	public List<Show> selectAll() throws SelectException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<ShowGenreDTO> selectByConcept(Long genreId, int startRn, int endRn) throws SelectException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<ShowAllInfoDTO> selectById(String id) throws SelectException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Integer selectByStringCnt(String value) throws SelectException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<ShowSearchDTO> selectByString(String value, int startRn, int endRn) throws SelectException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<ShowCalendarDTO> selectByDate(String yymm) throws SelectException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String insertMyShow(MyShowDTO myShowDTO) throws InsertException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<MyShowDTO> selectMyShowByMemberId(Long memberId) throws SelectException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String deleteMyShow(MyShowDTO myShowDTO) throws DeleteException {
		// TODO Auto-generated method stub
		return null;
	}

}
