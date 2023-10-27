package com.kosa.showfan.member.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kosa.showfan.member.dto.Member;
import com.kosa.showfan.member.service.MemberService;

@RestController
public class MemberController implements MemberControllerInterface{
    
	@Autowired
	private MemberService service;

	@GetMapping("/member") // /member
	public ResponseEntity<?> getMember(String email) {
//		service.select(email);
		return new ResponseEntity<>(HttpStatus.OK);
	}

	@PostMapping("/signup") // /signup
	public ResponseEntity<?> signUp(Member member) {
//		String email, pwd, nickName, emailr;
//		String[] genre;
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@PostMapping("/login") // /login
	public ResponseEntity<?> logIn() {
//		service.select(email);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@GetMapping("/logout") // /logout
	public ResponseEntity<?> logOut() {
//		service.select(email);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@GetMapping("/cookie") // /cookie
	public ResponseEntity<?> getCookie() {
//		service.select(email);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@GetMapping("/nicknamedupchk") // /nicknamedupchk
	public ResponseEntity<?> getNickName() {
//		service.select(email);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@GetMapping("/sendmail") // /sendmail
	public ResponseEntity<?> authMail() {
//		service.select(email);
		return new ResponseEntity<>(HttpStatus.OK);
	}
	
	@PutMapping("/modify") // /modify
	public ResponseEntity<?> putMember() {
//		service.select(email);
		return new ResponseEntity<>(HttpStatus.OK);
	}
		
}
