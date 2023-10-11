package com.kosa.showfan.myShow.service;

import com.kosa.showfan.controller.Controller;
import com.kosa.showfan.exception.AddException;
import com.kosa.showfan.exception.FindException;
import com.kosa.showfan.exception.RemoveException;
import com.kosa.showfan.myShow.dao.MyShowDAO;
import com.kosa.showfan.myShow.dao.MyShowDAOImpl;
import com.kosa.showfan.myShow.dto.MyShowDTO;

import java.util.List;

public class MyShowService {
    private static final MyShowService instance = new MyShowService();
    private MyShowDAO myShowDAO = MyShowDAOImpl.getInstance();

    public static MyShowService getInstance() {
        return instance;
    }

    public void insert(MyShowDTO myShowDTO) throws AddException {
        myShowDAO.insertMyShow(myShowDTO);
    }

    public void delete(MyShowDTO myShowDTO) throws RemoveException {
        myShowDAO.deleteMyShow(myShowDTO);
    }

    public List<MyShowDTO> selectById(Long memberId) throws FindException {
        return myShowDAO.selectAllByMemberId(memberId);
    }
}
