const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://Civic-AI2025:Civic-AI@cluster0.l6qc7dr.mongodb.net/Civic-AI?retryWrites=true&w=majority&appName=Cluster0';

console.log('Testing MongoDB connection...');

mongoose.connect(MONGODB_URI, {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
})
.then(() => {
  console.log('✅ MongoDB connection successful!');
  console.log('Database:', mongoose.connection.db.databaseName);
  process.exit(0);
})
.catch((error) => {
  console.error('❌ MongoDB connection failed:');
  console.error('Error name:', error.name);
  console.error('Error message:', error.message);
  if (error.reason) {
    console.error('Reason:', error.reason);
  }
  process.exit(1);
});
