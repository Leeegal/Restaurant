var mongodb = require('./db');

function Order(order) {
    this.dishes = order.dishes;
    this.allprice = order.allprice;
    this.id = dishes.id;
};

//存储用户信息
Order.prototype.save = function (callback) {
    //要存入数据库的用户文档
    var order = {
        dishes: this.dishes,
        allprice: this.allprice,
        id: this.id
    };
    //打开数据库
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);//错误，返回 err 信息
        }
        //读取 Order 集合
        db.collection('Order', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);//错误，返回 err 信息
            }
            //将用户数据插入 Order 集合
            collection.insert(order, {safe: true}, function (err, order) {
                mongodb.close();
                //成功！err 为 null，并返回存储后的用户文档
                return err ? callback(err) : callback(null, order.ops[0]);
            });
        });
    });
};

//读取订单信息
Order.get = function (id, callback) {
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);//错误，返回 err 信息
        }
        //读取 Order 集合
        db.collection('Order', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);//错误，返回 err 信息
            }
            //查找用户名（id键）值为 id 一个文档
            collection.findOne({id: id}, function (err, order) {
                mongodb.close();
                return err ? callback(err) : callback(null, order);
            });
        });
    });
};

module.exports = Order;

