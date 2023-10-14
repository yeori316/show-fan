package com.kosa.showfan.show.show.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.kosa.showfan.show.show.dto.ShowDTO;

public class ShowConceptController extends ShowController {

	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setHeader("Access-Control-Allow-Credentials", "true");
		response.setContentType("application/json;charset=utf-8");
		
		PrintWriter out = response.getWriter();
		
		Long genreId = Long.parseLong(request.getParameter("genreId"));
		try {
			List<ShowDTO> result = service.selectByConcept(genreId);
			System.out.println("asd");
			Gson gson = new Gson();
			String jsonResult = gson.toJson(result);
			out.print(jsonResult);
		} catch (Exception e) {
			e.printStackTrace();
		}	
		
	}

}
