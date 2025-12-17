// Simple MongoDB connection test
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://Civic-AI2025:Civic-AI@cluster0.l6qc7dr.mongodb.net/Civic-AI?retryWrites=true&w=majority&appName=Cluster0';

async function testConnection() {
  try {
    console.log('🔄 Testing MongoDB connection...');
    console.log('URI:', MONGODB_URI.replace(/\/\/([^:]+):([^@]+)@/, '//$1:****@'));
    
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
      socketTimeoutMS: 45000,
      family: 4,
    });
    
    console.log('✅ MongoDB connection successful!');
    console.log('Database:', mongoose.connection.db.databaseName);
    console.log('Host:', mongoose.connection.host);
    console.log('Ready State:', mongoose.connection.readyState);
    
    // Test a simple query
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('📦 Collections:', collections.map(c => c.name).join(', ') || 'None');
    
    await mongoose.disconnect();
    console.log('✅ Test completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ MongoDB connection test failed!');
    console.error('Error type:', error.name);
    console.error('Error message:', error.message);
    
    if (error.message.includes('ENOTFOUND') || error.message.includes('getaddrinfo')) {
      console.error('\n💡 DNS Resolution Failed:');
      console.error('   - Check your internet connection');
      console.error('   - Verify the MongoDB cluster address is correct');
      console.error('   - Try using a VPN if behind a firewall');
    } else if (error.message.includes('authentication')) {
      console.error('\n💡 Authentication Failed:');
      console.error('   - Verify username: Civic-AI2025');
      console.error('   - Check password in .env.local');
      console.error('   - Ensure user has proper permissions in MongoDB Atlas');
    } else if (error.message.includes('timeout') || error.message.includes('ETIMEDOUT')) {
      console.error('\n💡 Connection Timeout:');
      console.error('   - Check MongoDB Atlas Network Access (IP Whitelist)');
      console.error('   - Add 0.0.0.0/0 to allow all IPs (for testing)');
      console.error('   - Verify cluster is running (not paused)');
    }
    
    process.exit(1);
  }
}

testConnection();
