package com.czy.ds;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;

/**
 * Created by czy on 2017/5/15.
 */
@WebServlet(name = "/DsServlet")
public class DsServlet extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doPost(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        DataBase db = new DataBase();
        req.setCharacterEncoding("UTF-8");
        resp.setCharacterEncoding("UTF-8");
        PrintWriter out = resp.getWriter();
        try {
            //db.connect_database("root", "7539518426");
            db.connect_database("czy", "7539518426");
            if(req.getParameter("query").equals("list")) {
                String rs = db.get_list(req.getParameter("tab"), req.getParameter("type"));
                out.println(rs);
            }
            else if(req.getParameter("query").equals("basic_info")){
                String rs = db.get_basic_info(req.getParameter("tag"));
                out.println(rs);
            }
            else if(req.getParameter("query").equals("detail")){
                String rs = db.get_detail(req.getParameter("tag"));
                out.println(rs);
            }
            db.close_connect();
        } catch (SQLException e) {
            e.printStackTrace();
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
    }
}
