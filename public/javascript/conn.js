var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/new_db');
const conn = mongoose.connection
var msg = "";
conn.on('error', function(err) {
    msg = '连接数据库失败'
});

var userSchema = mongoose.Schema({
    mail: String,
    password: String,
    name: String,
    phoneNumber: String,
    type: String,
});
var users = mongoose.model("Person", userSchema);

var rsuSchema = mongoose.Schema({
    loAndLa: String,
    carNum: String,
    state: String,
    group: String
});
var rsu = mongoose.model("rsu", rsuSchema);

var carMenegerSchema = mongoose.Schema({
    license: String,
    carOwner: String,
    message: String,
    rsu: String,
    time: String
});
var carMeneger = mongoose.model("carMeneger", carMenegerSchema);

var msgSendSchema = mongoose.Schema({
    startTime: String,
    continueTime: String,
    kind: String,
    rsu: String,
    content: String
});
var msgSend = mongoose.model("msgSend", msgSendSchema);

var ideaSendSchema = mongoose.Schema({
    userName: String,
    ideaTitle: String,
    ideaContent: String,
    ideaPhone: String,
    ideaTime: String,
});
var ideaSend = mongoose.model("ideaSend", ideaSendSchema);

exports.rsu = rsu;
exports.users = users;
exports.carMeneger = carMeneger;
exports.msgSend = msgSend;
exports.ideaSend = ideaSend;