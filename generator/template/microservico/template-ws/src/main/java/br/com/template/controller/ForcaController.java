package br.com.forca.controller;

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
import br.com.forca.dao.ForcaDAO;
import br.com.forca.model.Forca;

@RestController
@RequestMapping(value = ForcaController.PATH)
public class ForcaController {

    public static final String PATH = "/forca";

    @CrossOrigin
    @RequestMapping(method = RequestMethod.GET)
    public //	return new ResponseEntity<String>("Tudo certo!", HttpStatus.OK);
    ResponseEntity<List<Forca>> get() {
        return new ResponseEntity<List<Forca>>(forcaDAO.findAll(), HttpStatus.OK);
    }

    @CrossOrigin
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<Forca> get(@PathVariable("id") int id) {
        return new ResponseEntity<Forca>(forcaDAO.findOne(id), HttpStatus.OK);
    }

    @CrossOrigin
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public //public HttpStatus delete (@PathVariable("id") int id, @RequestBody final Workshop workshopEntity) {
    HttpStatus delete(@PathVariable("id") int id) {
        forcaDAO.delete(id);
        return HttpStatus.OK;
    }

    @Autowired
    private ForcaDAO forcaDAO;

    @CrossOrigin
    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Forca> save(@RequestBody final Forca forcaEntity) {
        return new ResponseEntity<Forca>(forcaDAO.save(forcaEntity), HttpStatus.CREATED);
    }

    @CrossOrigin
    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public ResponseEntity<Forca> alter(@PathVariable("id") int id, @RequestBody final Forca forcaEntity) {
        return new ResponseEntity<Forca>(forcaDAO.save(forcaEntity), HttpStatus.OK);
    }
}

