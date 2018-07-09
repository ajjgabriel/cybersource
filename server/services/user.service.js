/**
 * Created by gaang on 18/4/18.
 */

const Promise = require('bluebird'),
    Transactions = require('../models/transactions'),
    constants = require('../helpers/constants'),
    logger = require('../../config/winston');

module.exports = {

    //Create transaction
    transaction : function(transactions){
        logger.info("Creating transaction in Database");
        logger.info(user);
        return new Promise((resolve, reject)=> {
            let newTransaction = new Transactions(transactions);
            newTransaction.save()
                .then(doc =>{
                    resolve(doc);
                })
                .catch(err => {
                    reject(err);
                })
        });
    }
}