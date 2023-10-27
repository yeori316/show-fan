package com.kosa.showfan.show.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.kosa.showfan.exception.DeleteException;
import com.kosa.showfan.exception.InsertException;
import com.kosa.showfan.exception.SelectException;
import com.kosa.showfan.show.dto.MyShowDTO;
import com.kosa.showfan.show.dto.Show;
import com.kosa.showfan.show.dto.ShowAllInfoDTO;
import com.kosa.showfan.show.dto.ShowCalendarDTO;
import com.kosa.showfan.show.dto.ShowGenreDTO;
import com.kosa.showfan.show.dto.ShowListDTO;
import com.kosa.showfan.show.dto.ShowSearchDTO;
import com.kosa.showfan.show.repository.ShowRepository;

@Service
public class ShowService implements ShowServiceInterface{
    
	@Autowired
    private ShowRepository repository;

   
    public List<Show> selectAll() throws Exception {
        return repository.selectAll();
    }

    public ShowListDTO search(String value, int page) throws SelectException {

        int showCnt = 20;                        // 1	2	3	4
        int endRn = showCnt * page;                // 20	40	60	80
        int startRn = (endRn - showCnt) + 1;    // 1	21	41	61

        int findShowCnt = repository.selectByStringCnt(value);
        List<ShowSearchDTO> list = repository.selectByString(value, startRn, endRn);

        return new ShowListDTO<>(findShowCnt, list);
    }

    public ShowListDTO calendar(String yymm) throws SelectException {
        List<ShowCalendarDTO> list = repository.selectByDate(yymm);
        return new ShowListDTO<>(list.size(), list);
    }

    public List<ShowAllInfoDTO> selectByShowId(String showId) throws Exception {
        return repository.selectById(showId);
    }

    public List<ShowGenreDTO> selectByConcept(Long genreId, int page) throws Exception {
    	
    	int showCnt = 30;                       
        int endRn = showCnt * page;             
        int startRn = (endRn - showCnt) + 1;    
        
        return repository.selectByConcept(genreId, startRn, endRn);
    }

    public String insertMyShow(MyShowDTO myShowDTO) throws InsertException {
        return repository.insertMyShow(myShowDTO);
    }

    public String deleteMyShow(MyShowDTO myShowDTO) throws DeleteException {
        return repository.deleteMyShow(myShowDTO);
    }

    public List<MyShowDTO> selectMyShowByMemberId(Long memberId) throws SelectException {
        return repository.selectMyShowByMemberId(memberId);
    }
}
