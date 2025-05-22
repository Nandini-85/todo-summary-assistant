const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

exports.generateSummary = async (todos) => {
  if (!todos || todos.length === 0) {
    return "No pending tasks to summarize.";
  }

  // Format the todos for the prompt
  const todoList = todos.map(todo => {
    const deadline = todo.deadline ? ` (Due: ${new Date(todo.deadline).toLocaleDateString()})` : '';
    return `- ${todo.title}${deadline}: ${todo.description || 'No description provided'}`;
  }).join('\n');

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that summarizes todo lists. Organize the todos by priority, deadline, and provide a concise overview of what needs to be done."
        },
        {
          role: "user",
          content: `Please summarize the following list of pending tasks:\n\n${todoList}`
        }
      ],
      max_tokens: 500
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error generating summary:', error);
    throw new Error('Failed to generate summary with OpenAI');
  }
};
