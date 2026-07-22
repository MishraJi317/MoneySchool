package com.example.demo.DTO;

public class ContextDTO {

	private String query;
    private Integer id;

    public String getQuery() {
        return query;
    }

    public ContextDTO() {
		super();
	}

	public ContextDTO(String query, Integer id) {
		super();
		this.query = query;
		this.id = id;
	}

	public void setQuery(String query) {
        this.query = query;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
}
