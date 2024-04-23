/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

package com.sisedu.model.DAO;

import com.sisedu.model.bean.AnioAcademico;
import org.springframework.beans.factory.annotation.Autowire;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

/**
 *
 * @author DESARROLLO
 */

public interface AnioAcademicoDao {
    
    void insertAnioAcademico(AnioAcademico anioAcademico);
    
}
