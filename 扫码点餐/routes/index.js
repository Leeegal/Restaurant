var fs = require('fs');
var path = require('path');
var crypto = require('crypto');
var User = require('../models/user');

module.exports = function(app) {
  /* GET home page. */
  app.get('/', function(req, res, next) {
    res.render('client', { title: '皮皮怪点餐', username:"lg", id:5 });
  });
  app.get('/*/handin', function(req, res, next){
    var ingredients = new Array();
    var ingredient = new Object();
    var ingredient1 = new Object();
    ingredient.name = "咸鱼";
    ingredient.price = 648;
    ingredient.cost = 6;
    ingredient.stock = 0;
    ingredients[0] = ingredient;
    ingredient1.name = "咸鱼2";
    ingredient1.price = 6482;
    ingredient1.cost = 62;
    ingredient1.stock = 12;
    ingredients[1] = ingredient1;
    console.log(ingredients);
	  res.render('order_detail', {ingredients:ingredients} )

  }); 


























  app.post('/', function (req, res) {
    //表单类型
    var op = req.query.op;
    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.password).digest('hex');
    if (op == 'regist') {
      //生成密码的 md5 值
      var newUser = new User({
        name: req.body.username,
        password: password,
        phone: req.body.phone,
        email: req.body.email
      });
      //检查用户名是否已经存在 
      User.get(newUser.name, function (err, user) {
        if (err) {
            return res.json(err);
        }
        if (user) {
            return res.json("exited");
        }
        newUser.save(function (err, user) {
            if (err) {
                return res.json(err);
            }
            req.session.user = user;
            return res.json("success");
        });
      });
    }
    else if(op == 'login') {
      //登录表单处理
      var name = req.body.username;
      User.get(name, function (err, user) {
        if (err) {
            return res.json(err);
        }
        else if (user) {
            if(user.password == password){
              req.session.user = user;
              return res.json("success");
            }
            else {
              return res.json("wrongPassword");
            }
        }
        else {
          return res.json("notFound");
        }
      });
    }
  });


  //管理页
  app.get('/user', function(req, res, next) {
    var op = req.query.op;
    if (op == "logout") {
      req.session.user = null;
    }
    else {
      var user = req.session.user;
      if(user) {
        if(user.name == req.query.username && req.query.info) {
          //防止通过改url访问他人数据

          //待修改-根据页面返回相应数据
          //test-返回对象数组
          var ingredients = new Array();
          var ingredient = new Object();
          var ingredient1 = new Object();
          ingredient.name = "咸鱼";
          ingredient.price = 648;
          ingredient.cost = 6;
          ingredient.stock = 0;
          ingredients[0] = ingredient;
          ingredient1.name = "咸鱼2";
          ingredient1.price = 6482;
          ingredient1.cost = 62;
          ingredient1.stock = 12;
          ingredients[1] = ingredient1;
          console.log(ingredients);
          //test-返回对象数组
          return res.render('info-' + req.query.info, {username: user.name, ingredients: ingredients});
        }
      return res.redirect('/user?username=' + user.name + '&info=personal');
      }
    }
    return res.redirect('/');
  });
//管理页
  app.get('/order', function(req, res, next) {
    var op = req.query.op;
    if (op == "logout") {
      req.session.user = null;
    }
    else {
      var user = req.session.user;
      if(user) {
        if(user.name == req.query.username && req.query.info) {
          //防止通过改url访问他人数据

          //待修改-根据页面返回相应数据
          //test-返回对象数组
          var ingredients = new Array();
          var ingredient = new Object();
          var ingredient1 = new Object();
          ingredient.name = "咸鱼";
          ingredient.price = 648;
          ingredient.cost = 6;
          ingredient.stock = 0;
          ingredients[0] = ingredient;
          ingredient1.name = "咸鱼2";
          ingredient1.price = 6482;
          ingredient1.cost = 62;
          ingredient1.stock = 12;
          ingredients[1] = ingredient1;
          console.log(ingredients);
          //test-返回对象数组
          return res.render('info-' + req.query.info, {username: user.name, ingredients: ingredients});
        }
      return res.redirect('/user?username=' + user.name + '&info=personal');
      }
    }
    return res.redirect('/');
  });
  //修改表单
  app.post('/user', function(req, res, next) {

  });


  app.use(function (req, res) {    //获取css,js,img
    return res.sendFile(__dirname + '../public' + req.url);
  });
}
