const supabase = require('../config/db');

const TABLE_NAME = 'todos';

exports.getAllTodos = async () => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
};

exports.createTodo = async (todo) => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .insert([todo])
    .select();
  
  if (error) throw error;
  return data[0];
};

exports.updateTodo = async (id, updates) => {
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .update(updates)
    .eq('id', id)
    .select();
  
  if (error) throw error;
  return data[0];
};

exports.deleteTodo = async (id) => {
  const { error } = await supabase
    .from(TABLE_NAME)
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return { success: true };
};
