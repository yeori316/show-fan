package com.kosa.showfan.show.controller;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.kosa.showfan.exception.FindException;
import com.kosa.showfan.show.dto.ShowListDTO;

public class ShowSearchController extends ShowController {

	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
//		response.setHeader("Access-Control-Allow-Origin", "*"); // "http://127.0.0.1:5500"
//		response.setHeader("Access-Control-Allow-Credentials", "true");
		response.setContentType("application/json;charset=utf-8");
		
		PrintWriter out = response.getWriter();	
		String value = request.getParameter("q");
//		ObjectMapper mapper = new ObjectMapper();
		Gson gson = new Gson();
		ShowListDTO showList;
		
		try {
			showList = service.search(value);
//			String jsonStr = mapper.writeValueAsString(showList);
//			out.print(jsonStr);
			String jsonResult = gson.toJson(showList);
			out.print(jsonResult);
		} catch (FindException e) {
			e.printStackTrace();
			response.setStatus(404);
		} catch (Exception e) {
			e.printStackTrace();
			response.setStatus(500);
		}

	}

}
