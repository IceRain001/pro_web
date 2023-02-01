对FruitDAOImpl中的获取连接操作以及释放连接操作做了提取

BaseDAO的必要性：方便统一操作获取连接所需要的信息
                FruitDAO中相似的操作也提取进BaseDAO（增删改的操作变为一个方法）

BaseDAO中的setParams(...)：因为多个地方使用到方法中的代码，因而将代码抽取出来封装为一个方法

为BaseDAO使用泛型 --》BaseDAO<T> ，将需要操作的bean类传入进去

缺陷：只能够用来查询单表（后续进行改进）

addFruit:
1.获取连接
2.编写sql ：insert
3.psmt
4.填充参数 ： 4个参数
5.执行更新
6.释放资源


updateFruit:
1.获取连接
2.编写sql ： update
3.psmt
4.填充参数 ： 2个参数
5.执行更新
6.释放资源






