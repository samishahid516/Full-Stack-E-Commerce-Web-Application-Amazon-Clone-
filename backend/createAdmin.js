const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();

const User = require('./models/User');

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Check if admin already exists
    const adminExists = await User.findOne({ email: 'admin@shop.com' });
    if (adminExists) {
      console.log('⚠️ Admin user already exists. You can log in.');
      process.exit();
    }

    // Create the admin user WITHOUT deleting anyone else
    const salt = await bcrypt.genSalt(10);
    const adminPassword = await bcrypt.hash('admin123', salt);

    const adminUser = new User({
      name: 'Admin User',
      email: 'admin@shop.com',
      password: adminPassword,
      role: 'admin',
    });

    await adminUser.save();
    console.log('✅ Admin user created successfully!');
  } catch (error) {
    console.error('❌ Error creating admin:', error);
  } finally {
    process.exit();
  }
};

createAdmin();
