package com.kosa.showfan.show.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kosa.showfan.show.service.ShowService;

@RestController
public class ShowController implements ShowControllerInterface{
	
	@Autowired
	private ShowService service;
	
	@GetMapping("/show")
	public ResponseEntity<?> getShowList() {
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@GetMapping("/showconcept") // /showconcept
	public ResponseEntity<?> getKindOfShow(Integer genreId,
										   Integer p) {
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@GetMapping("/showdetail") // /showdetail
	public ResponseEntity<?> getShowInfo(Integer showId) {
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@GetMapping("/search") // /search
	public ResponseEntity<?> getSearchShow(String q,
										   Integer p) {
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@GetMapping("/calendar") // /calendar
	public ResponseEntity<?> getShowListOfCalendar(Integer y,
												   Integer m) {
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@PostMapping("/myshow") // /myshow
	public ResponseEntity<?> postMyShow(Integer memberId,
			Integer showId) {
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@GetMapping("/myshow") // /myshow
	public ResponseEntity<?> getMyShow(Integer memberId) {
		return new ResponseEntity<>(HttpStatus.OK);
	}
		
	@DeleteMapping("/myshow") // /myshow
	public ResponseEntity<?> delMyShow(Integer memberId,
									   Integer showId) {
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
}
