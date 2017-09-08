'use strict';

const axios = require('axios');

function Devless(url, token) {
  //CRUD

  //Add data to service table
  this.addData = function(serviceName, tableName, data, callback) {
    let config = {
      headers: {
        "Devless-token": token
      }
    };
    axios.post(
      url + "/api/v1/service/" + serviceName + "/db",
      {
        "resource": [{
          "name": tableName,
          "field": [data]
        }]
      }, config
    ).then(function (response) {
      callback(response.data);
    })
      .catch(function (error) {
        console.log(error);
      });
  }

  //Query data from service table
  this.queryData = function (serviceName, tableName, params, callback) {
    let queryParams = "";
    for (let item in params) {
      queryParams += "&" + item + "=" + params[item];
    }
    axios({
      method: 'get',
      url: url + "/api/v1/service/" + serviceName + "/db?table=" + tableName + queryParams,
      headers: {
        "Devless-token": token
      }
    }).then(function (response) {
      callback(response.data);
    })
      .catch(function (error) {
        console.log(error);
      });
  }

  //Update data in service table
  this.updateData = function (serviceName, tableName, identifierField, identifierValue, data, callback) {
    let config = {
      headers: {
        "Devless-token": token
      }
    };
    axios.patch(
      url + "/api/v1/service/" + serviceName + "/db",
      {
        "resource": [{
          "name": tableName,
          "params": [{
            "where": identifierField + ',' + identifierValue,
            "data": [
              data
            ]
          }]
        }]
      }, config
    ).then(function (response) {
      callback(response.data);
    })
      .catch(function (error) {
        console.log(error);
      });
  }

  //Delete data in service table
  this.deleteData = function (serviceName, tableName, identifierField, identifierValue, callback) {
    axios({
      method: 'delete',
      headers: {
        "Devless-token": token
      },
      url: url + "/api/v1/service/" + serviceName + "/db",
      data: {
        "resource": [{
          "name": tableName,
          "params": [{
            "where": identifierField + ',' + identifierValue,
            "delete": true
          }]
        }]
      }
    }).then(function (response) {
      callback(response.data);
    })
      .catch(function (error) {
        console.log(error);
      });
  }


  //Authentication

  //actions: signup, login
  this.authenticate = function (action, params, callback) {
    axios({
      method: 'post',
      headers: {
        "Devless-token": token
      },
      url: url + "/api/v1/service/devless/rpc?action=" + action,
      data: {
        "jsonrpc": "2.0",
        "method": "devless",
        "id": "1000",
        "params": params
      }
    }).then(function (response) {
      callback(response.data);
    })
      .catch(function (error) {
        console.log(error);
      });
  }
}

module.exports = Devless