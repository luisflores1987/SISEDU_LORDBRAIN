/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.sisedu.model.DAO;

import com.sisedu.model.bean.AnioAcademico;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowire;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;


/**
 *
 * @author DESARROLLO
 */
@Component("anioAcademicoDao")
@Transactional
public class AnioAcademicoDaoImpl implements AnioAcademicoDao{

    Logger log = LogManager.getRootLogger();
    
    @PersistenceContext // INYECTAR UNA REFERENCIA DE PERSISTENCIA
    private EntityManager em;
    
    @Override
    public void insertAnioAcademico(AnioAcademico anioAcademico) {
        em.persist(anioAcademico);
    }
    
}
