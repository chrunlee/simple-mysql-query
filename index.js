var mysql = require('mysql');
var async = require('async');

var pool,configs;

var query = function(list){
    if(list.host && !pool){
        configs = list;
        pool = mysql.createPool(list);
        return;
    }
    if(!pool){
        pool = mysql.createPool(configs);
    }
    if(!list.length){
        list = [list];
    }
    return new Promise(function(resolve,reject){
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err);
            }
            if(!connection){
                reject('connection is not connected');
            }
            connection.beginTransaction(function (err) {
                if (err) {
                    reject(err);
                }
                var funcAry = [];
                list.forEach(function (sql_param) {
                    var temp = function (cb) {
                        var sql = sql_param.sql;
                        var param = sql_param.params;
                        connection.query(sql, param||[], function (tErr, rows, fields) {
                            if (tErr) {
                                cb(tErr);
                            } else {
                                cb(null,rows);
                            }
                        })
                    };
                    funcAry.push(temp);
                });

                async.parallel(funcAry, function (err, result) {
                    if (err) {
                        connection.rollback(function (err2) {
                            connection.release();
                            reject(err2);
                        });
                    } else {
                        connection.commit(function (err2, info) {
                            if (err2) {
                                connection.rollback(function (err3) {
                                    connection.release();
                                    reject(err3);
                                });
                            } else {
                                connection.release();
                                resolve(result);
                            }
                        })
                    }
                });
            });
        }); 
    });   
};

module.exports = query;