package com.example.demo.Models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;

@Entity
@Table(name = "persona")
public class Persona {

	@Id
	private int id;
	
	@Lob
	@Column(columnDefinition = "LONGTEXT")
	private String persona;
	
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getPersona() {
		return persona;
	}

	public void setPersona(String persona) {
		this.persona = persona;
	}

	public Persona(int id, String persona) {
		super();
		this.id = id;
		this.persona = persona;
	}
	
	public Persona() {
	}
	
	
}
