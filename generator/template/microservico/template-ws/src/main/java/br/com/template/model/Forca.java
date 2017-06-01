package br.com.forca.model;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "forca")
public class Forca implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
 @Column(name="jogo")
 private String jogo;
 public void setJogo(String jogo) {
 this.jogo = jogo; 
}
 public String getJogo() {
 return jogo; 
}
 @Column(name="jogador")
 private String jogador;
 public void setJogador(String jogador) {
 this.jogador = jogador; 
}
 public String getJogador() {
 return jogador; 
}
 @Column(name="pontos")
 private int pontos;
 public void setPontos(int pontos) {
 this.pontos = pontos; 
}
 public int getPontos() {
 return pontos; 
}
 }
