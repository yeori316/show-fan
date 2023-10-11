package com.kosa.showfan.myArtist.controller;

import com.google.gson.Gson;
import com.kosa.showfan.controller.Controller;
import com.kosa.showfan.exception.FindException;
import com.kosa.showfan.myArtist.dto.MyArtistDTO;
import com.kosa.showfan.myArtist.service.MyArtistService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

public class MyArtistController implements Controller {
    protected MyArtistService service;

    public MyArtistController() {
        service = MyArtistService.getInstance();
    }

    @Override
    public void execute(HttpServletRequest request, HttpServletResponse response) throws IOException {
        if (request.getMethod().equals("GET")) {
            PrintWriter out = response.getWriter();
            Gson gson = new Gson();
            List<MyArtistDTO> myArtistList;
            try {
                myArtistList = service.selectById(Long.valueOf(request.getParameter("memberId")));
                String jsonResult = gson.toJson(myArtistList);
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

}
