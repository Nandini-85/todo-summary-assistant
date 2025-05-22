const llmService = require('../services/llmService');
const slackService = require('../services/slackService');
const Todo = require('../models/Todo');

exports.summarizeAndSend = async (req, res, next) => {
  try {
    // Get all incomplete todos
    const allTodos = await Todo.getAllTodos();
    const pendingTodos = allTodos.filter(todo => !todo.completed);
    
    if (pendingTodos.length === 0) {
      return res.status(200).json({ 
        message: 'No pending todos to summarize',
        success: false 
      });
    }
    
    // Generate summary using LLM
    const summary = await llmService.generateSummary(pendingTodos);
    
    // Send to Slack
    const slackResponse = await slackService.sendToSlack(summary);
    
    res.status(200).json({
      summary,
      slackResponse,
      success: true
    });
  } catch (error) {
    next(error);
  }
};