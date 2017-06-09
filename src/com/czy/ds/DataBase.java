package com.czy.ds;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;

import java.sql.*;

/**
 * Created by czy on 2017/5/15.
 */
public class DataBase {
    private Connection conn = null;
    private PreparedStatement pstatement = null;
    private ResultSet rs = null;

    public DataBase(){
    }
    public void connect_database(String user, String password) throws SQLException, ClassNotFoundException{
        String driver = "com.mysql.jdbc.Driver";
        // URL指向要访问的数据库名
        String url = "jdbc:mysql://127.0.0.1:3306/ds";
        // 加载驱动程序
        Class.forName(driver);
        // 连接数据库
        conn = DriverManager.getConnection(url, user, password);
    }
    public void close_connect() throws SQLException{
        rs.close();
        pstatement.close();
        conn.close();
    }
    public String get_list(String tab, String type) throws SQLException{
        if(type.equals("all")){
            String sql = "select * from items where tab=? order by type";
            pstatement = conn.prepareStatement(sql);
            pstatement.setString(1, tab);
        }
        else {
            String sql = "select * from items where type=? order by tag";
            pstatement = conn.prepareStatement(sql);
            pstatement.setString(1, type);
        }
        rs = pstatement.executeQuery();
        return resultset_to_json(rs);
    }
    public String get_basic_info(String tag) throws SQLException{
        String sql = "select * from basic_info natural join items where tag=?";
        pstatement = conn.prepareStatement(sql);
        pstatement.setString(1, tag);
        rs = pstatement.executeQuery();
        return resultset_to_json(rs);
    }
    public String get_detail(String tag) throws SQLException{
        String sql = "select * from detail where tag=?";
        pstatement = conn.prepareStatement(sql);
        pstatement.setString(1, tag);
        rs = pstatement.executeQuery();
        return resultset_to_json(rs);
    }
    public String resultset_to_json(ResultSet rs) throws SQLException {
        // json数组
        JSONArray array = new JSONArray();

        // 获取列数
        ResultSetMetaData metaData = rs.getMetaData();
        int columnCount = metaData.getColumnCount();

        // 遍历ResultSet中的每条数据
        while (rs.next()) {
            JSONObject jsonObj = new JSONObject();

            // 遍历每一列
            for (int i = 1; i <= columnCount; i++) {
                String columnName =metaData.getColumnLabel(i);
                String value = rs.getString(columnName);
                jsonObj.put(columnName, value);
            }
            array.add(jsonObj);
        }
        return array.toString();
    }
}
