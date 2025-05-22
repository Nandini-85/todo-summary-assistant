const axios = require('axios');

exports.sendToSlack = async (message) => {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;

  if (!webhookUrl) {
    throw new Error('Slack webhook URL is not configured');
  }

  try {
    const response = await axios.post(webhookUrl, {
      text: `*Todo Summary*\n\n${message}`
    });

    return { success: true };
  } catch (error) {
    console.error('Error sending message to Slack:', error);
    throw new Error('Failed to send message to Slack');
  }
};
