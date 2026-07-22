package com.example.demo.Service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Models.Persona;
import com.example.demo.Repository.PersonaRepository;


@Service
public class PersonaService {

	@Autowired
	PersonaRepository repo;
	
	public String savePersona(Persona p)
	{
		try
		{
			repo.save(p);
			return "success";
		}
		catch(Exception ex)
		{
			return ex.getLocalizedMessage();
		}
	}
	
	public Persona getPersona(int id)
	{
		return repo.findById(id).orElse(null);
	}
}
