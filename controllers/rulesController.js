const astUtils = require('../utils/astUtils');
const Rule = require('../models/Rule');

exports.createRule = async (req, res) => {
    try {
        const { ruleString } = req.body;
        const ast = astUtils.createRule(ruleString);
        const newRule = new Rule({ ruleString });
        await newRule.save();
        res.status(201).json({ ast });
    } catch (error) {
        res.status(400).json({ error: 'Invalid rule string' });
    }
};

exports.combineRules = (req, res) => {
    const { rules } = req.body;
    const combinedAst = astUtils.combineRules(rules);
    res.json({ combinedAst });
};

exports.evaluateRule = (req, res) => {
    const { ast, data } = req.body;
    const result = astUtils.evaluateRule(ast, data);
    res.json({ result });
};