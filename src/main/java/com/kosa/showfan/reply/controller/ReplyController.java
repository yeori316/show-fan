package com.kosa.showfan.reply.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kosa.showfan.reply.service.ReplyService;

@RestController
public class ReplyController implements ReplyControllerInterface {

	@Autowired
	private ReplyService service;
	
	@PostMapping("/insertreply") // /insertreply
	public ResponseEntity<?> postReply() {
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@PutMapping("/updatereply")
	public ResponseEntity<?> putReply() {
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@DeleteMapping("/deletereply")
	public ResponseEntity<?> delReply() {
		return new ResponseEntity<>(HttpStatus.OK);
	}
}
