package com.kosa.showfan.show.show.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.kosa.showfan.show.show.dto.ShowDTO;

public class ShowAllController extends ShowController {

	@Override
	public void execute(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
//		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setHeader("Access-Control-Allow-Credentials", "true");
		response.setContentType("application/json;charset=utf-8");
		
		PrintWriter out = response.getWriter();
		try {
			List<ShowDTO> result = service.selectAll();
			Gson gson = new Gson();
			String jsonResult = gson.toJson(result);
			out.print(jsonResult);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	}
