import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const summaryService = {
  summarizeAndSend: async () => {
    const response = await axios.post(`${API_URL}/summarize`);
    return response.data;
  }
};

export default summaryService;