package com.example.demo.Controller;

import java.io.IOException;
import org.springframework.web.reactive.function.client.WebClient;

import com.example.demo.DTO.ContextDTO;
import com.example.demo.Models.Persona;
import com.example.demo.Models.UserInfo;
import com.example.demo.Service.PersonaService;
import com.example.demo.Service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import reactor.core.publisher.Mono;


@RestController
public class ApiController {
	
	@Autowired
	UserService service;
	@Autowired
	PersonaService persona;

	private final WebClient webClient = WebClient.create();

	@GetMapping("/Active")
	public String getActiveStatus() throws IOException, InterruptedException {
		String apiUrl = "https://moneyschoolagents.onrender.com/";

		String retVal = webClient.get().uri(apiUrl).retrieve().bodyToMono(String.class).block(); //

		System.out.println(retVal);

		return retVal;
	}

	
	@PostMapping("/persona")
	public String getPersona(@RequestBody UserInfo u) throws JsonProcessingException {

		String apiUrl = "https://moneyschoolagents.onrender.com/persona";
		ObjectMapper mapper = new ObjectMapper();
		ObjectNode profileObject = (ObjectNode) mapper.valueToTree(u);
		profileObject.remove("id");
		ObjectNode finalJsonObject = mapper.createObjectNode();
		finalJsonObject.set("profile", profileObject);
		String finalJson = mapper.writeValueAsString(finalJsonObject);


		int id = service.addUser(u);
		String response = webClient.post()
			    .uri(apiUrl)
			    .contentType(MediaType.APPLICATION_JSON)
			    .bodyValue(finalJson)
			    .retrieve()
			    .bodyToMono(String.class)
			    .block();
		
		
		    Persona p = new Persona(id, response);
		    persona.savePersona(p);
		    
		return response;
	}
	
	
	@PostMapping("/context")
	public String getContext(@RequestBody ContextDTO con) throws JsonProcessingException
	{
		System.out.println(con.getQuery());
		System.out.println(con.getId());
		String apiUrl = "https://moneyschoolagents.onrender.com/context";
		Persona p = persona.getPersona(con.getId());
		String per = p.getPersona();
		ObjectMapper mapper = new ObjectMapper();
		
		JsonNode root = mapper.readTree(per);
		String persona = root.get("persona").asText();
		
		
		
		ObjectNode jsonObject = mapper.createObjectNode();
	    jsonObject.put("query", con.getQuery());
	    jsonObject.put("persona", persona);
	    String finalJson = mapper.writeValueAsString(jsonObject);
	    
	    String response = webClient.post()
			    .uri(apiUrl)
			    .contentType(MediaType.APPLICATION_JSON)
			    .bodyValue(finalJson)
			    .retrieve()
			    .bodyToMono(String.class)
			    .block();
	    
		return response;
	}

}
