/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sisedu.controller;

import com.sisedu.model.DAO.ConsultaDeudasDAO;
import com.sisedu.model.DAO.RegistroPagosDAO;
import com.sisedu.model.bean.Boleta;
import com.sisedu.util.Utilitarios;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.commons.codec.binary.Base64;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.poifs.filesystem.POIFSFileSystem;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.DataFormat;
import org.apache.poi.ss.util.CellRangeAddress;

/**
 *
 * @author DESARROLLO
 */
@WebServlet(name = "variosImprimirServletController", urlPatterns = {"/Formularios/variosImprimirServletController"})
public class variosImprimirServletController extends HttpServlet {

    RegistroPagosDAO registroPagos = new RegistroPagosDAO();
    ConsultaDeudasDAO consultaDeudasDAO = new ConsultaDeudasDAO();

    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException, ParseException {

        String action = request.getParameter("action");
        if (action.equalsIgnoreCase("imprimirConsultaPagos")) {
            imprimirConsultaPagos(request, response);
        } else if (action.equalsIgnoreCase("imprimirConsultaDeudas")) {
            imprimirConsultaDeudas(request, response);
        }
    }

    private void imprimirConsultaPagos(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {

        String sDni = request.getParameter("txtDni");
        String sNombres = request.getParameter("txtApNom");
        int nNivel = Integer.valueOf(request.getParameter("cboNivel").equals("") ? "0" : request.getParameter("cboNivel"));
        String sRecibo = request.getParameter("txtRecibo");
        String sFechaInicial = request.getParameter("txtFechaInicial");
        String sFechaFinal = request.getParameter("txtFechaFin");

        boolean bFecha = (sFechaInicial != "" && sFechaFinal != "") ? true : false;
        boolean bDni = sDni != null && !sDni.equals("");;
        boolean bApenom = sNombres != null && !sNombres.equals("");
        boolean bNivel = nNivel > 0;
        boolean bRecibo = sRecibo != null && !sRecibo.equals("");

        ByteArrayOutputStream out = new ByteArrayOutputStream();
        HSSFWorkbook wb = null;
        List<List<Object>> listaBoleta = registroPagos.
                consultaDatosPagosReporte(bDni, bApenom, bNivel,
                        bRecibo, bFecha, sDni, sNombres, nNivel,
                        sRecibo, sFechaInicial, sFechaFinal);

        wb = exportarReporteImprimirConsultaPagos(listaBoleta);
        wb.write(out);
        out.flush();
        String data = Base64.encodeBase64String(out.toByteArray());
        request.setAttribute("data", data);
        getServletContext().getRequestDispatcher("/Formularios/frmExportarExcel.jsp").forward(request, response);

    }

    private void imprimirConsultaDeudas(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException {

        int nIdNivel = Integer.valueOf(request.getParameter("idNivel") == null ? "0" : request.getParameter("idNivel"));
        String sAnioAcademico = request.getParameter("anioAcademico") == null ? "" : request.getParameter("anioAcademico");
        int nIdGrado = Integer.valueOf(request.getParameter("idGrado") == null ? "0" : request.getParameter("idGrado"));

        String sNivel = request.getParameter("desNivel") == null ? "" : request.getParameter("desNivel");
        String sGrado = request.getParameter("desGrado") == null ? "" : request.getParameter("desGrado");

        boolean bNivel = nIdNivel > 0;
        boolean bGrado = nIdGrado > 0;

        ByteArrayOutputStream out = new ByteArrayOutputStream();
        HSSFWorkbook wb = null;
        List<List<Object>> listaDeuda = consultaDeudasDAO.
                consultaDatosDeudasReporte(bNivel, bGrado, nIdNivel, nIdGrado, sAnioAcademico);

        wb = exportarReporteImprimirConsultaDeudas(
                listaDeuda,
                sAnioAcademico,
                sNivel,
                sGrado
        );
        
        wb.write(out);
        out.flush();
        String data = Base64.encodeBase64String(out.toByteArray());
        request.setAttribute("data", data);
        getServletContext().getRequestDispatcher("/Formularios/frmExportarExcel.jsp").forward(request, response);

    }

    private HSSFWorkbook exportarReporteImprimirConsultaPagos(List<List<Object>> listaObjBoleta) {
        try {
            //FECHA

            SimpleDateFormat formateador = new SimpleDateFormat("dd/MM/yyyy HH:mm:SS");
            // date

            String sfechaActual = formateador.format(new Date());

            //FIN - FECHA
            HSSFWorkbook workBook = null;
            ServletContext scontext = getServletContext();
            POIFSFileSystem fs = new POIFSFileSystem(scontext.getResourceAsStream("/template/Reporte_Pagos.xls"));

            try {
                workBook = new HSSFWorkbook(fs);
            } catch (IOException ex) {
                java.util.logging.Logger.getLogger(obtenerConsolidadoNotasServletController.class.getName()).log(Level.SEVERE, null, ex);
            }
            HSSFSheet hssfSheetMatriz = workBook.getSheetAt(0); // selecciona la hoja.
            //HSSFRow row, rowDetalle,rowMatriz;

            HSSFCell cell = null;
                // estilo titulo
            HSSFCellStyle cellstyleTitulo = Utilitarios.darEstilo(workBook, 1);
            
            // estilo cabecera
            HSSFCellStyle cellstyleCabecera = Utilitarios.darEstilo(workBook, 3);
       
            // estilo detallado
            HSSFCellStyle cellStyle = Utilitarios.darEstilo(workBook, 4);

            // estilo formato fecha 
            HSSFCellStyle cellStyleFecha = Utilitarios.darEstilo(workBook, 5);
            
            if (listaObjBoleta != null && !listaObjBoleta.isEmpty()) {

                int nContColumnas = 0; // numero de columna
                List<HSSFRow> rowMatriz = new ArrayList<HSSFRow>();
                int nContRow = 5; // segunda fila
                int nCabecera = nContRow; // para dar estilo
                List<Object> obj = null;

                for (int k = 0; k < listaObjBoleta.size(); k++) {  // k ---> son las filas de la tabla
                    obj = listaObjBoleta.get(k);
                    //crearCabecera(workBook, 1, hssfSheetMatriz, cellstyleSub);
                    rowMatriz.add(creaFila(nContRow, hssfSheetMatriz)); // aqui se crea la fila de la tabla 
                    nContRow++; // se aumenta una linea 
                    crearCeldaPorLista(listaObjBoleta, rowMatriz.get(k), cell, cellStyle, obj, cellstyleCabecera, nContColumnas, cellStyleFecha, nCabecera); // crea las columnas
                }
                // identificar el numero de columnas a ajustar
                nContColumnas = nContColumnas + listaObjBoleta.get(0).size();

                //Autoajuste
                for (int y = 1; y < nContColumnas; y++) {
                    hssfSheetMatriz.autoSizeColumn((short) y, true);
                }

                // Fusionar celdas: sheet.addMergedRegion(rowFrom,rowTo,colFrom,colTo)
//                hssfSheetMatriz.addMergedRegion(new CellRangeAddress(2, 2, 4, 6));
                creaCelda(
                        hssfSheetMatriz.createRow((short) (2)), // FILA 2  --- > EMPIEZAN DESDE 0
                        cell,
                        cellstyleTitulo,
                        4, // COLUMNA 2
                        "REPORTE DE PAGOS  " + sfechaActual,
                        0,
                        cellstyleTitulo,
                        cellstyleTitulo,
                        0
                );
            }

            return workBook;
        } catch (IOException ex) {
            throw new RuntimeException(ex);
        }
    }

    private HSSFWorkbook exportarReporteImprimirConsultaDeudas(List<List<Object>> listaObjDeudas,
                                                               String sAnioAcademico,
                                                               String sNivel,
                                                               String sGrado) {
        try {
            //FECHA

            SimpleDateFormat formateador = new SimpleDateFormat("dd/MM/yyyy HH:mm:SS");
            // date

            String sfechaActual = formateador.format(new Date());

            //FIN - FECHA
            HSSFWorkbook workBook = null;
            ServletContext scontext = getServletContext();
            POIFSFileSystem fs = new POIFSFileSystem(scontext.getResourceAsStream("/template/Reporte_Deudas.xls"));

            try {
                workBook = new HSSFWorkbook(fs);
            } catch (IOException ex) {
                java.util.logging.Logger.getLogger(obtenerConsolidadoNotasServletController.class.getName()).log(Level.SEVERE, null, ex);
            }
            HSSFSheet hssfSheetMatriz = workBook.getSheetAt(0); // selecciona la hoja.
            //HSSFRow row, rowDetalle,rowMatriz;

            HSSFCell cell = null;


            // estilo titulo
            HSSFCellStyle cellstyleTitulo = Utilitarios.darEstilo(workBook, 1);

            // estilo Sub Titulo
            HSSFCellStyle cellstyleSubtitulo = Utilitarios.darEstilo(workBook, 2);
            
            // estilo cabecera
            HSSFCellStyle cellstyleCabecera = Utilitarios.darEstilo(workBook, 3);
       
            // estilo detallado
            HSSFCellStyle cellStyle = Utilitarios.darEstilo(workBook, 4);

            // estilo formato fecha 
            HSSFCellStyle cellStyleFecha = Utilitarios.darEstilo(workBook, 5);


            if (listaObjDeudas != null && !listaObjDeudas.isEmpty()) {

                int nContColumnas = 0; // numero de columna
                List<HSSFRow> rowMatriz = new ArrayList<HSSFRow>();
                int nContRow = 8; // sexta fila
                int nCabecera = nContRow;
                List<Object> obj = null;

                for (int k = 0; k < listaObjDeudas.size(); k++) {  // k ---> son las filas de la tabla
                    obj = listaObjDeudas.get(k);
                    //crearCabecera(workBook, 1, hssfSheetMatriz, cellstyleSub);
                    rowMatriz.add(creaFila(nContRow, hssfSheetMatriz)); // aqui se crea la fila de la tabla 
                    nContRow++; // se aumenta una linea 
                    crearCeldaPorLista(listaObjDeudas, rowMatriz.get(k), cell, cellStyle,
                            obj, cellstyleCabecera, nContColumnas, cellStyleFecha, nCabecera); // crea las columnas
                }
                // identificar el numero de columnas a ajustar
                nContColumnas = nContColumnas + listaObjDeudas.get(0).size();

                //Autoajuste
                for (int y = 1; y < nContColumnas; y++) {
                    hssfSheetMatriz.autoSizeColumn((short) y, true);
                }

                // Fusionar celdas: sheet.addMergedRegion(rowFrom,rowTo,colFrom,colTo)
//                hssfSheetMatriz.addMergedRegion(new CellRangeAddress(2, 2, 4, 6));
                creaCelda(
                        hssfSheetMatriz.createRow((short) (2)), // FILA 3  --- > EMPIEZAN DESDE 0
                        cell,
                        cellstyleTitulo,
                        4, // COLUMNA 2
                        "CONSULTA DE DEUDAS  " + sfechaActual,
                        0,
                        cellstyleTitulo,
                        cellstyleTitulo,
                        0
                );

// 
                
                creaCelda(
                        hssfSheetMatriz.getRow((short) (4)), // FILA 5  --- > EMPIEZAN DESDE 0
                        cell,
                        cellstyleSubtitulo,
                        1, // COLUMNA 2
                        sAnioAcademico,
                        0,
                        cellstyleSubtitulo,
                        cellstyleSubtitulo,
                        0
                );

                creaCelda(
                        hssfSheetMatriz.getRow((short) (5)), // FILA 6  --- > EMPIEZAN DESDE 0
                        cell,
                        cellstyleSubtitulo,
                        1, // COLUMNA 2
                        sNivel,
                        0,
                        cellstyleSubtitulo,
                        cellstyleSubtitulo,
                        0
                );
                
                creaCelda(
                        hssfSheetMatriz.getRow((short) (6)), // FILA 7  --- > EMPIEZAN DESDE 0
                        cell,
                        cellstyleSubtitulo,
                        1, // COLUMNA 2
                        sGrado,
                        0,
                        cellstyleSubtitulo,
                        cellstyleSubtitulo,
                        0
                );                

            }

            return workBook;
        } catch (IOException ex) {
            throw new RuntimeException(ex);
        }
    }

    private void crearCeldaPorLista(List<List<Object>> lstDetalleReporteBoleta,
            HSSFRow rowMatriz, HSSFCell cell, HSSFCellStyle cellStyle,
            List<Object> obj, HSSFCellStyle cellStyleCabecera,
            int nContador, HSSFCellStyle cellStyleFecha, int nCabecera) { // crea celda por cada columna
        for (int j = 0; j < lstDetalleReporteBoleta.get(0).size(); j++) { // j es el numero de columnas...
            cell = creaCelda(rowMatriz, cell, cellStyle, j + nContador, obj.get(j), nContador, cellStyleCabecera, cellStyleFecha, nCabecera);
        }
    }

    public HSSFRow creaFila(int rownum, HSSFSheet hoja) {
        return hoja.createRow((short) (rownum));
    }

    public HSSFCell creaCelda(
            HSSFRow row, //1
            HSSFCell cell, //2
            HSSFCellStyle cellStyle, //3
            int columnIndex, //4
            Object valor, //5
            int contador, //6
            HSSFCellStyle cellStyleCabecera, //7 
            HSSFCellStyle cellStyleFecha, //8
            int nCabecera
    ) { /// columnIndex ---> el numero de la columna

        if (valor instanceof Date) {
            cell = row.createCell(columnIndex, 4);  // los numeros enteros indican el tipo de dato de la columna -- >> 4 es fecha
            cell.setCellStyle(cellStyleFecha);
        } else {
            cell = row.createCell(columnIndex, 1);
            cell.setCellStyle(cellStyle);
        }

        // INICIO - Dar estilo a la cabecera.
        if (row.getRowNum() == nCabecera) {
            cell.setCellStyle(cellStyleCabecera);
        }
        // FIN - Dar estilo a la cabecera.        

        if (valor == null) {
            cell.setCellValue("");
        } else {
            if (valor instanceof Date) {
                cell.setCellValue((Date) valor);
            } else {
                cell.setCellValue(valor.toString());
            }
        }
        return cell;
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        try {
            processRequest(request, response);
        } catch (ParseException ex) {
            Logger.getLogger(variosImprimirServletController.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        try {
            processRequest(request, response);
        } catch (ParseException ex) {
            Logger.getLogger(variosImprimirServletController.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>    

}
