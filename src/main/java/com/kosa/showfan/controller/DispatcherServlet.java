package com.kosa.showfan.controller;

import java.io.FileInputStream;
import java.io.IOException;
import java.lang.reflect.Method;
import java.util.Properties;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/")
public class DispatcherServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private String envFileName = "controller.properties";
	private Properties env;
	
    public DispatcherServlet() {
    	super();
    }

	@Override
	public void init() throws ServletException {
		super.init();
		env = new Properties();
		ServletContext sc = this.getServletContext();
		String realPath = sc.getRealPath("WEB-INF\\classes\\" + envFileName);
//		System.out.println(">>>" + realPath);

    	try {
			env.load(new FileInputStream(realPath));
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	protected void service(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
//		System.out.println("request.getServletPath()=" + request.getServletPath());
		
//		if (request.getServletPath().equals("/productjson")) {
//			ProductJsonController control = new ProductJsonControler();
//			control.execute(request, response);
//		}
		
		response.setHeader("Access-Control-Allow-Origin", "*");//"http://127.0.0.1:5500");
		response.setHeader("Access-Control-Allow-Credentials", "true");
		
		//DispatcherServlet의service()입니다
		String className = env.getProperty(request.getServletPath());
//		className = "com.kosa.showfan.show.controller.ShowServlet";
		
		try {
			Class<?> clazz = Class.forName(className); //클래스이름에 해당하는 .class파일 찾아서 JVM으로 로드
			Controller controller;
			try {
				Method method = clazz.getMethod("getInstance");
				controller = (Controller) method.invoke(null); //static인 getInstance()메서드호출
			}catch(NoSuchMethodException e) {			
				controller = (Controller) clazz.getDeclaredConstructor().newInstance();
			}
			controller.execute(request, response);
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
