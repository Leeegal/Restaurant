var mongodb = require('./db');

function Dishes(dishes) {
    this.name = dishes.name;
    this.price = dishes.price;
    this.image = dishes.image;
    this.id = dishes.id;
};

//存储用户信息
Dishes.prototype.save = function (callback) {
    //要存入数据库的用户文档
    var dishes = {
        name: this.name,
        price: this.price,
        image:this.image,
        id: this.id
    };
    //打开数据库
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);//错误，返回 err 信息
        }
        //读取 Dishes 集合
        db.collection('Dishes', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);//错误，返回 err 信息
            }
            //将用户数据插入 dishes 集合
            collection.insert(dishes, {safe: true}, function (err, dishes) {
                mongodb.close();
                //成功！err 为 null，并返回存储后的用户文档
                return err ? callback(err) : callback(null, dishes.ops[0]);
            });
        });
    });
};

//读取用户信息
Dishes.get = function (id, callback) {
    mongodb.open(function (err, db) {
        if (err) {
            return callback(err);//错误，返回 err 信息
        }
        //读取 Dishes 集合
        db.collection('Dishes', function (err, collection) {
            if (err) {
                mongodb.close();
                return callback(err);//错误，返回 err 信息
            }
            //查找用户名（id键）值为 id 一个文档
            collection.findOne({id: id}, function (err, dishes) {
                mongodb.close();
                return err ? callback(err) : callback(null, dishes);
            });
        });
    });
};

module.exports = Dishes;

