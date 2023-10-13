package com.kosa.showfan.artist.controller;

import com.google.gson.Gson;
import com.kosa.showfan.artist.dto.ArtistDTO;
import com.kosa.showfan.artist.service.ArtistService;
import com.kosa.showfan.controller.Controller;
import com.kosa.showfan.exception.FindException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

public class ArtistController implements Controller {
    protected ArtistService service;

    public ArtistController() {
        service = ArtistService.getInstance();
    }

    @Override
    public void execute(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json;charset=utf-8");
        
        PrintWriter out = response.getWriter();
        Gson gson = new Gson();
        ArtistDTO artist;
        try {
            artist = service.selectById(Long.valueOf(request.getParameter("artistId")));
            String jsonResult = gson.toJson(artist);
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
