package com.atguigu.jdbc;

import com.alibaba.druid.pool.DruidDataSource;
import com.alibaba.druid.pool.DruidDataSourceFactory;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.Properties;

//读取外部的配置文件设置连接池
public class Demo04Druid {
    public static void main(String[] args) throws SQLException, IOException {

        Properties properties = new Properties();
        //此行语句作用：获得Demo04Druid类所在src目录下的指定文件的流
        //如果使用File对象的方式获得流，当项目部署在服务器上时，其路径易出问题（不推荐）
        InputStream is = Demo04Druid.class.getClassLoader().getResourceAsStream("jdbc.properties");
        properties.load(is);

        DruidDataSource dataSource = new DruidDataSource();

        dataSource.setDriverClassName(properties.getProperty("jdbc.driverClassName"));
        dataSource.setUrl(properties.getProperty("jdbc.url"));
        dataSource.setUsername(properties.getProperty("jdbc.username"));
        dataSource.setPassword(properties.getProperty("jdbc.pwd"));

        //properties.getProperty("jdbc.initSize")结果为String
        dataSource.setInitialSize(Integer.parseInt(properties.getProperty("jdbc.initSize")));
        dataSource.setMaxActive(Integer.parseInt(properties.getProperty("jdbc.maxActive")));
        dataSource.setMaxWait(Integer.parseInt(properties.getProperty("jdbc.maxWait")));

        for(int i = 0 ; i<10 ; i++){
            Connection conn1 = dataSource.getConnection();
            System.out.println(i+"-------->"+conn1);

        }
    }
}
