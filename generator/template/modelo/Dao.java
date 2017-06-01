package br.com.template.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.template.model.Template;

@Repository
public interface TemplateDAO extends JpaRepository<Template, Integer>{

}
