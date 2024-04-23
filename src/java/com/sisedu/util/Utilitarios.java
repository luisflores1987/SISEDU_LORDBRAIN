/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.sisedu.util;

import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFFont;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.hssf.util.HSSFColor;
import org.apache.poi.ss.usermodel.DataFormat;

/**
 *
 * @author DESARROLLO
 */
public class Utilitarios {

    public static HSSFCellStyle darEstilo(HSSFWorkbook workBook, int tipo) {
        HSSFCellStyle cellStyle = workBook.createCellStyle();
        HSSFFont font = workBook.createFont();
        DataFormat format = workBook.createDataFormat();// para habilitar el formato persozalizado        

        switch (tipo) {

            case 1: // titulo
                cellStyle.setAlignment(HSSFCellStyle.ALIGN_CENTER);
                font.setFontName(HSSFFont.FONT_ARIAL);
                font.setFontHeightInPoints((short) 12);
                font.setColor(HSSFColor.BLACK.index);
                font.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
                cellStyle.setFont(font);
                break;

            case 2: // sub titulo
                cellStyle.setAlignment(HSSFCellStyle.ALIGN_CENTER);
                font.setFontName(HSSFFont.FONT_ARIAL);
                font.setFontHeightInPoints((short) 10);
                font.setColor(HSSFColor.BLACK.index);
                cellStyle.setFont(font);
                break;

            case 3: // cabecera de detalle
                cellStyle.setAlignment(HSSFCellStyle.ALIGN_CENTER);
                cellStyle.setBorderBottom(HSSFCellStyle.BORDER_THIN);
                cellStyle.setBottomBorderColor(HSSFColor.BLACK.index);
                cellStyle.setBorderLeft(HSSFCellStyle.BORDER_THIN);
                cellStyle.setLeftBorderColor(HSSFColor.BLACK.index);
                cellStyle.setBorderRight(HSSFCellStyle.BORDER_THIN);
                cellStyle.setRightBorderColor(HSSFColor.BLACK.index);
                cellStyle.setBorderTop(HSSFCellStyle.BORDER_THIN);
                cellStyle.setTopBorderColor(HSSFColor.BLACK.index);
                font.setFontName(HSSFFont.FONT_ARIAL);
                font.setFontHeightInPoints((short) 10); //-> tamaño de letra
                font.setColor(HSSFColor.BLACK.index);
                font.setBoldweight(HSSFFont.BOLDWEIGHT_BOLD);
                cellStyle.setFont(font);
                break;

            case 4: // detalle
                cellStyle.setDataFormat((short) 49);
                cellStyle.setBorderBottom(HSSFCellStyle.BORDER_THIN);
                cellStyle.setBottomBorderColor(HSSFColor.BLACK.index);
                cellStyle.setBorderLeft(HSSFCellStyle.BORDER_THIN);
                cellStyle.setLeftBorderColor(HSSFColor.BLACK.index);
                cellStyle.setBorderRight(HSSFCellStyle.BORDER_THIN);
                cellStyle.setRightBorderColor(HSSFColor.BLACK.index);
                cellStyle.setBorderTop(HSSFCellStyle.BORDER_THIN);
                cellStyle.setTopBorderColor(HSSFColor.BLACK.index);

                break;
            case 5: // detalle fecha
                cellStyle.setDataFormat(format.getFormat("dd/mm/yyyy hh:mm")); // custom number format
                cellStyle.setBorderBottom(HSSFCellStyle.BORDER_THIN);
                cellStyle.setBottomBorderColor(HSSFColor.BLACK.index);
                cellStyle.setBorderLeft(HSSFCellStyle.BORDER_THIN);
                cellStyle.setLeftBorderColor(HSSFColor.BLACK.index);
                cellStyle.setBorderRight(HSSFCellStyle.BORDER_THIN);
                cellStyle.setRightBorderColor(HSSFColor.BLACK.index);
                cellStyle.setBorderTop(HSSFCellStyle.BORDER_THIN);
                cellStyle.setTopBorderColor(HSSFColor.BLACK.index);
                break;
        }

        return cellStyle;
    }

}
