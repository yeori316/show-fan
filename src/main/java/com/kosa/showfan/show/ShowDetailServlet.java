package com.kosa.showfan.show;

import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.kosa.showfan.show.service.ShowService;

/**
 * Servlet implementation class ShowDetailServlet
 */
@WebServlet("/showDetail")
public class ShowDetailServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private ShowService showService;
	
	public ShowDetailServlet() {
		showService = new ShowService();
	}
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String showId = request.getParameter("SHOW_ID");
		
	}


}
