package com.kosa.showfan.review.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kosa.showfan.review.service.ReviewService;

@RestController
public class ReviewController implements ReviewControllerInterface {
	
	@Autowired
	private ReviewService service;
	
	@GetMapping("/selectreview") // /selectreview
	public ResponseEntity<?> getRevie() {
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@PostMapping("/insertreview") // /insertreview
	public ResponseEntity<?> postRevie() {
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@PutMapping("/updatereview") // /updatereview
	public ResponseEntity<?> pupRevie() {
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@DeleteMapping("/deletereview") // /deletereview
	public ResponseEntity<?> delRevie() {
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@GetMapping("/memberreview") // /memberreview
	public ResponseEntity<?> getMyRevie() {
		return new ResponseEntity<>(HttpStatus.OK);
	}	
}
