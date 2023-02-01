package com.atguigu.jdbc;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.Arrays;
/*
* 批处理操作
* */
public class Demo01Batch {
    public static void main(String[] args) throws ClassNotFoundException, SQLException {
        Class.forName("com.mysql.jdbc.Driver");
        //批处理操作一： 如果要执行批处理任务，URL中需要添加一个参数：rewriteBatchedStatements=true（有时不添加也可以使用）
        Connection conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/fruitdb?useSSL=false&useUnicode=true&characterEncoding=utf-8&serverTimezone=UTC","root","root");
        String sql = "insert into t_fruit values(0,?,?,?,?)";
        PreparedStatement psmt = conn.prepareStatement(sql);
        for(int i = 0 ; i<10 ; i++){
            psmt.setString(1,"榴莲"+i);
            psmt.setInt(2,15);
            psmt.setInt(3,100);
            psmt.setString(4,"榴莲是一种神奇的水果");

            //批处理操作二：psmt.addBatch()
            psmt.addBatch();

            if(i%1000==0){  //如果任务较多，可以分批次执行，每次执行完，清空任务队列
                psmt.executeBatch();
                psmt.clearBatch();
            }
        }
        //批处理操作三
        //返回结果是批处理中每条命令影响的行数
        int[] count = psmt.executeBatch();

        for (int i = 0; i < count.length; i++) {
            System.out.println(count[i]);
        }

        psmt.close();
        conn.close();
    }
}
