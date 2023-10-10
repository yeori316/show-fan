package com.kosa.showfan.show.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
import com.kosa.showfan.show.dto.ShowDTO;
import com.kosa.showfan.show.service.ShowService;


/**
 * Servlet implementation class ShowServlet
 */
@WebServlet("/show")
public class ShowServlet extends HttpServlet {
//public class ShowServlet extends ShowController {	
	private static final long serialVersionUID = 1L;
	private ShowService showService = ShowService.getInstance();
	
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		
		response.setHeader("Access-Control-Allow-Origin", "*");
		response.setHeader("Access-Control-Allow-Credentials", "true");
		response.setContentType("application/json;charset=utf-8");
		
		PrintWriter out = response.getWriter();
		try {
			List<ShowDTO> result = showService.selectAll();
			Gson gson = new Gson();
			String jsonResult = gson.toJson(result);
			out.print(jsonResult);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

//	@Override
//	public void execute(HttpServletRequest request, HttpServletResponse response)
//			throws ServletException, IOException {
//
//		PrintWriter out = response.getWriter();
//		out.print("/show test");
//	}

}
