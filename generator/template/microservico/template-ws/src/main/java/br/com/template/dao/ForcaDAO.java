package br.com.forca.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import br.com.forca.model.Forca;

@Repository
public interface ForcaDAO extends JpaRepository<Forca, Integer> {
}

