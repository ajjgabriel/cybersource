/**
 * Created by gaang on 18/4/18.
 */
const mongoose = require('../../config/persistence'),
    constants = require('../helpers/constants'),
    Schema = mongoose.Schema;

const transactionsSchema = new mongoose.Schema({
        userId: { type: String },
        tp_sid : {type: String},
        nameOnCard: { type: String, required: true },
        phone: { type: String, required: true },
        last4: { type: String, required: true },
        avatar: { type: String },
        status: { type: String, default: 'ACTIVE' },
        metadata: { type: Schema.Types.Mixed },
        totalPoints : { type: Number},
        transactions: [{ type: Schema.Types.Mixed}]
    },
    {
        timestamps : true
    }
);

module.exports = mongoose.model('transactions', transactionsSchema);