package com.kosa.showfan.show.repository;

import java.util.List;

import com.kosa.showfan.exception.DeleteException;
import com.kosa.showfan.exception.InsertException;
import com.kosa.showfan.exception.SelectException;
import com.kosa.showfan.show.dto.MyShowDTO;
import com.kosa.showfan.show.dto.ShowAllInfoDTO;
import com.kosa.showfan.show.dto.ShowCalendarDTO;
import com.kosa.showfan.show.dto.Show;
import com.kosa.showfan.show.dto.ShowGenreDTO;
import com.kosa.showfan.show.dto.ShowSearchDTO;

public interface ShowRepositoryInterface {
	
	/**
	 * show 전체 조회
	 * 
	 * @return
	 * @throws SelectException
	 */
	List<Show> selectAll() throws SelectException;

	/**
	 * show 장르별 조회
	 * 
	 * @param genreId
	 * @param startRn
	 * @param endRn
	 * @return
	 * @throws SelectException
	 */
	List<ShowGenreDTO> selectByConcept(Long genreId, int startRn, int endRn) throws SelectException;
	
	/**
	 * show 상세 조회
	 * 
	 * @param id
	 * @return
	 * @throws SelectException
	 */
	List<ShowAllInfoDTO> selectById(String id) throws SelectException;


    /**
     * 공연명 검색 시 공연 갯수
     * 
     * @param value
     * @return
     * @throws SelectException
     */
    Integer selectByStringCnt(String value) throws SelectException;

    /**
     * show 검색
     * 
     * @param value
     * @param startRn
     * @param endRn
     * @return
     * @throws SelectException
     */
    List<ShowSearchDTO> selectByString(String value, int startRn, int endRn) throws SelectException;

    /**
     * show 월별 조회
     * 
     * @param yymm
     * @return
     * @throws SelectException
     */
    List<ShowCalendarDTO> selectByDate(String yymm) throws SelectException;

    /**
     * show 찜하기
     *
     * @param myShowDTO
     * @return
     * @throws InsertException
     */
    String insertMyShow(MyShowDTO myShowDTO) throws InsertException;

    /**
     * 찜한 show 조회
     *
     * @param memberId
     * @return 작품 리스트
     * @throws SelectException
     */
    List<MyShowDTO> selectMyShowByMemberId(Long memberId) throws SelectException;

    /**
     * 찜한 show 삭제
     *
     * @param myShowDTO
     * @return
     * @throws DeleteException
     */
    String deleteMyShow(MyShowDTO myShowDTO) throws DeleteException;
}
