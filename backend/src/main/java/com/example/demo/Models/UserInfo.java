package com.example.demo.Models;

import org.springframework.stereotype.Component;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;


@Entity
public class UserInfo {
 
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	public int id;
	
	public String name;
	public int age;
	public String gender;
	public String marital_status;
	public String city;
	public String occupation;
	public String industry;
	public String education;
	public int monthly_income;
	public int monthly_expenses;
	public int current_savings;
	public String investments ;
	public String loans;
	public boolean insurance;
	public String emergency_fund;
	public String assets;
	public String liabilities;
	public String short_term_goals;
	public String long_term_goals;
	public String investment_experience;
	public String[] preferred_languages; 
	
    
	public UserInfo(String name, int age, String gender, String marital_status, String city, String occupation,
			String industry, String education, int monthly_income, int monthly_expenses, int current_savings,
			String investments, String loans, boolean insurance, String emergency_fund, String assets,
			String liabilities, String short_term_goal, String long_term_goal, String investment_experience,
			String[] preferred_languages) {
		super();
		this.name = name;
		this.age = age;
		this.gender = gender;
		this.marital_status = marital_status;
		this.city = city;
		this.occupation = occupation;
		this.industry = industry;
		this.education = education;
		this.monthly_income = monthly_income;
		this.monthly_expenses = monthly_expenses;
		this.current_savings = current_savings;
		this.investments = investments;
		this.loans = loans;
		this.insurance = insurance;
		this.emergency_fund = emergency_fund;
		this.assets = assets;
		this.liabilities = liabilities;
		this.short_term_goals = short_term_goal;
		this.long_term_goals = long_term_goal;
		this.investment_experience = investment_experience;
		this.preferred_languages = preferred_languages;
	}
	
	public int getId()
	{
		return this.id;
	}
	
	
}
