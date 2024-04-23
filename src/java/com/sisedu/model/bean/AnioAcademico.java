/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sisedu.model.bean;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

/**
 *
 * @author DESARROLLO
 */
@Entity
@Table(name = "AnioAcademico",schema = "dbo",catalog = "SiseduBDAP")
public class AnioAcademico implements Serializable{
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @NotNull
    private int nIdAnioAcademico;
    @Column(name = "sDescripcion")
    @Size(max = 6)
    private String sDescripcion;
    @Column(name = "sEstado")
    @Size(max = 2)
    private String sEstado;
    @Column(name = "sUsuarioCreador")
    @Size(max = 500)
    private String sUsuarioCreador;
    @Column(name = "dFechaCreacion")
    @Temporal(TemporalType.TIMESTAMP)
    private Date dFechaCreacion;
    @Column(name = "sUsuarioEliminacion")
    private String sUsuarioEliminacion;
    @Column(name = "dFechaEliminacion")
    @Temporal(TemporalType.TIMESTAMP)
    private Date dFechaEliminacion;

    public int getnIdAnioAcademico() {
        return nIdAnioAcademico;
    }

    public void setnIdAnioAcademico(int nIdAnioAcademico) {
        this.nIdAnioAcademico = nIdAnioAcademico;
    }

    public String getsDescripcion() {
        return sDescripcion;
    }

    public void setsDescripcion(String sDescripcion) {
        this.sDescripcion = sDescripcion;
    }

    public String getsEstado() {
        return sEstado;
    }

    public void setsEstado(String sEstado) {
        this.sEstado = sEstado;
    }

    public String getsUsuarioCreador() {
        return sUsuarioCreador;
    }

    public void setsUsuarioCreador(String sUsuarioCreador) {
        this.sUsuarioCreador = sUsuarioCreador;
    }

    public Date getdFechaCreacion() {
        return dFechaCreacion;
    }

    public void setdFechaCreacion(Date dFechaCreacion) {
        this.dFechaCreacion = dFechaCreacion;
    }

    public String getsUsuarioEliminacion() {
        return sUsuarioEliminacion;
    }

    public void setsUsuarioEliminacion(String sUsuarioEliminacion) {
        this.sUsuarioEliminacion = sUsuarioEliminacion;
    }

    public Date getdFechaEliminacion() {
        return dFechaEliminacion;
    }

    public void setdFechaEliminacion(Date dFechaEliminacion) {
        this.dFechaEliminacion = dFechaEliminacion;
    }

    @Override
    public String toString() {
        return "AnioAcademico{" + "nIdAnioAcademico=" + nIdAnioAcademico + ", sDescripcion=" + sDescripcion + ", sEstado=" + sEstado + '}';
    }
    

}
