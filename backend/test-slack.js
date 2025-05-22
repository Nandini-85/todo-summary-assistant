// Test script
const axios = require('axios');
require('dotenv').config();

const webhookUrl = process.env.SLACK_WEBHOOK_URL;

async function testSlackWebhook() {
  try {
    const response = await axios.post(webhookUrl, {
      text: "🎉 *Test from Todo Summary Assistant*\n\nThis is a test message to verify the Slack integration is working correctly."
    });
    
    console.log('Slack integration successful!');
    console.log('Status:', response.status);
  } catch (error) {
    console.error('Slack integration failed:', error.message);
  }
}

testSlackWebhook();