package com.example.demo.Service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Models.UserInfo;
import com.example.demo.Repository.UserRepository;

@Service
public class UserService {

	@Autowired
	UserRepository repo;
	
	public Optional<UserInfo> findUser(int id)
	{
		try
		{
			return repo.findById(id);
		}
		catch(Exception ex)
		{
			return null;
		}
	}
	
	public int addUser(UserInfo u)
	{
		try
		{
			repo.save(u);
			return u.getId();
		}
		catch(Exception ex)
		{
			return 0;
		}
	}
}
