/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sisedu.controller;

import com.sisedu.model.DAO.ObtenerMenusDAO;
import com.sisedu.model.bean.ListaMenu_TipoAcceso;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

/**
 *
 * @author MAQ
 */
@WebServlet(name = "obtenerMenus2ServletController_anterior", urlPatterns = {"/Formularios/obtenerMenus2ServletController_anterior"})
public class obtenerMenus2ServletController_anterior extends HttpServlet {

    ObtenerMenusDAO obtenerMenu = new ObtenerMenusDAO();
    List<ListaMenu_TipoAcceso> listaAccesoMenu = new ArrayList<ListaMenu_TipoAcceso>();

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        PrintWriter out = response.getWriter();
        HttpSession session = request.getSession();
        try {
            System.out.println("menu : " + request.getParameter("acceso"));
            int nAcceso = Integer.valueOf((request.getParameter("acceso")==""?"0":request.getParameter("acceso")));
            listaAccesoMenu = obtenerMenu.obtenerMenus(nAcceso);
            session.setAttribute("listaAccesoMenu", listaAccesoMenu);
            request.setAttribute("listaAccesoMenu", listaAccesoMenu);
            request.getRequestDispatcher("/Formularios/frmObtenerMenu.jsp").forward(request, response);
        } finally {
            out.close();
        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /** 
     * Handles the HTTP <code>GET</code> method.
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /** 
     * Handles the HTTP <code>POST</code> method.
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        processRequest(request, response);
    }

    /** 
     * Returns a short description of the servlet.
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>
}
