/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sisedu.controller;

import com.sisedu.model.bean.AnioAcademico;
import com.sisedu.services.AnioAcademicoService;
import java.io.Serializable;
import javax.annotation.PostConstruct;
import javax.faces.application.FacesMessage;
import javax.faces.bean.ManagedBean;
import javax.faces.bean.SessionScoped;
import javax.faces.context.FacesContext;
import org.springframework.beans.factory.annotation.Autowired;

/**
 *
 * @author DESARROLLO
 */
@ManagedBean(name = "anioAcademicoController")
@SessionScoped
public class AnioAcademicoController implements Serializable {

    private String sAnioEscolar;
    private AnioAcademico anioAcademico;
    @Autowired
    private AnioAcademicoService anioAcademicoService;

    @PostConstruct
    public void init() {
        anioAcademico = new AnioAcademico();
    }

    public String getsAnioEscolar() {
        return sAnioEscolar;
    }

    public void setsAnioEscolar(String sAnioEscolar) {
        this.sAnioEscolar = sAnioEscolar;
    }

    public void establecerAnio() {
        FacesContext facesContext = FacesContext.getCurrentInstance();
        try {
            anioAcademico.setsDescripcion(this.sAnioEscolar == null ? "Cero" : this.sAnioEscolar);
            anioAcademicoService.insertAnioAcademico(anioAcademico);
            facesContext.addMessage(null, new FacesMessage(FacesMessage.SEVERITY_INFO, "Información", "El año se guardo correctamente."));
        } catch (Exception e) {
            System.out.println(e);
            facesContext.addMessage(null, new FacesMessage(FacesMessage.SEVERITY_ERROR, "Información", "El año no se guardo satisfactoriamente\n" + e));
        }

    }
}
