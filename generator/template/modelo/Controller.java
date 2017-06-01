package br.com.template.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import br.com.template.dao.TemplateDAO;
import br.com.template.model.Template;

@RestController
@RequestMapping(value = TemplateController.PATH)
public class TemplateController {
	
	public static final String PATH = "/template";
	
	@CrossOrigin
	@RequestMapping(method = RequestMethod.GET)
	//public ResponseEntity<String> hello(){
	//	return new ResponseEntity<String>("Tudo certo!", HttpStatus.OK);
	public ResponseEntity<List<Template>> get () {
		return new ResponseEntity<List<Template>>(templateDAO.findAll(), HttpStatus.OK);
	}
	
	@CrossOrigin
	@RequestMapping(value="/{id}", method = RequestMethod.GET)
	public ResponseEntity<Template> get (@PathVariable("id") int id) {
		return new ResponseEntity<Template>(templateDAO.findOne(id), HttpStatus.OK);
	}
	
	@CrossOrigin
	@RequestMapping(value="/{id}", method = RequestMethod.DELETE)
	//public HttpStatus delete (@PathVariable("id") int id, @RequestBody final Workshop workshopEntity) {
	public HttpStatus delete (@PathVariable("id") int id) {
		templateDAO.delete(id);
		return HttpStatus.OK;
	}
	
	@Autowired
	private TemplateDAO templateDAO;
	
	@CrossOrigin
	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<Template> save (@RequestBody final Template templateEntity){
		return new ResponseEntity<Template>(templateDAO.save(templateEntity), HttpStatus.CREATED);
	}
	
	@CrossOrigin
	@RequestMapping(value="/{id}", method = RequestMethod.PUT)	
	public ResponseEntity<Template> alter (@PathVariable("id") int id, @RequestBody final Template templateEntity) {
		return new ResponseEntity<Template>(templateDAO.save(templateEntity), HttpStatus.OK);
	}
	
}
