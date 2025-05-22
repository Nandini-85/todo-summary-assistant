// Test script
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

async function testConnection() {
  try {
    // Try to query the todos table
    const { data, error } = await supabase.from('todos').select('*').limit(1);
    
    if (error) throw error;
    
    console.log('Connection successful!');
    console.log('Data:', data);
  } catch (error) {
    console.error('Connection failed:', error.message);
  }
}

testConnection();