package com.kosa.showfan.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.view.InternalResourceViewResolver;

@Configuration
@EnableWebMvc // HandlerAdapter가 messageConvert 하도록 설정
			  // WebApplicationContext 타입의 스프링 컨테이너가 된다.
public class MyMVCContext implements WebMvcConfigurer{
		
	@Bean
	public CommonsMultipartResolver multipartResolver() {
		CommonsMultipartResolver r = new CommonsMultipartResolver();
		r.setDefaultEncoding("UTF-8");
		r.setMaxUploadSize(1024 * 100);
		r.setMaxUploadSizePerFile(1024 * 10);
		return r;
	}

	@Override
	public void addCorsMappings(CorsRegistry registry) {
		registry.addMapping("/**")
				.allowedOrigins("http://192.168.1.23:5500")
				.allowedMethods("GET", "POST", "PUT", "DELETE") // * )
				.allowCredentials(true);
	}
	
}