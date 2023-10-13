package com.kosa.showfan.myShow.controller;

import com.google.gson.Gson;
import com.kosa.showfan.controller.Controller;
import com.kosa.showfan.exception.AddException;
import com.kosa.showfan.exception.FindException;
import com.kosa.showfan.exception.RemoveException;
import com.kosa.showfan.myShow.dto.MyShowDTO;
import com.kosa.showfan.myShow.service.MyShowService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

public class MyShowController implements Controller {
	protected MyShowService service;

	public MyShowController() {
		service = MyShowService.getInstance();
	}

	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response) throws IOException {
		if (request.getMethod().equals("GET")) {
			PrintWriter out = response.getWriter();
			Gson gson = new Gson();
			List<MyShowDTO> myShowList;
			try {
				myShowList = service.selectById(Long.valueOf(request.getParameter("memberId")));
				String jsonResult = gson.toJson(myShowList);
				out.print(jsonResult);
			} catch (FindException e) {
				e.printStackTrace();
				response.setStatus(404);
			} catch (Exception e) {
				e.printStackTrace();
				response.setStatus(500);
			}
		} else if (request.getMethod().equals("POST")) {
			try {
				MyShowDTO myShowDTO = new MyShowDTO();
				myShowDTO.setMemberId(Long.valueOf(request.getParameter("memberId")));
				myShowDTO.setShowId(request.getParameter("showId"));
				service.insert(myShowDTO);
			} catch (AddException e) {
				e.printStackTrace();
				response.setStatus(404);
			} catch (Exception e) {
				e.printStackTrace();
				response.setStatus(500);
			}
		} else if (request.getMethod().equals("DELETE")) {
			try {
				MyShowDTO myShowDTO = new MyShowDTO();
				myShowDTO.setMemberId(Long.valueOf(request.getParameter("memberId")));
				myShowDTO.setShowId(request.getParameter("showId"));
				service.delete(myShowDTO);
			} catch (RemoveException e) {
				e.printStackTrace();
				response.setStatus(404);
			} catch (Exception e) {
				e.printStackTrace();
				response.setStatus(500);
			}
		}
	}
}