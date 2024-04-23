/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sisedu.services;

import com.sisedu.model.DAO.AnioAcademicoDao;
import com.sisedu.model.bean.AnioAcademico;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service("AnioAcademicoService")
public class AnioAcademicoServiceImpl implements AnioAcademicoService {
    
    @Autowired
    private AnioAcademicoDao anioAcademicoDao;

    @Override
    public void insertAnioAcademico(AnioAcademico anioAcademico) {
        anioAcademicoDao.insertAnioAcademico(anioAcademico);
    }

}
