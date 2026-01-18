const tap = require('tap');
const supertest = require('supertest');
const mongoose = require('mongoose');
const env = require('../src/config/env');

const app = require('../app');
const server = supertest(app);

// Connect to database before all tests
let dbConnected = false;

const connectDB = async () => {
    if (!dbConnected && mongoose.connection.readyState === 0) {
        try {
            await mongoose.connect(env.mongodbUri, {
                serverSelectionTimeoutMS: 10000
            });
            dbConnected = true;
            console.log('MongoDB connected successfully for tests');
        } catch (err) {
            console.error('Failed to connect to database:', err.message);
        }
    }
};

// Connect before first test and clean up
tap.before(async () => {
    await connectDB();
    // Clean up test user if exists
    const UserModel = require('../src/models/user_model');
    const PreferenceModel = require('../src/models/preferences.model');
    const testEmail = 'clark@superman.com';
    const existingUser = await UserModel.findOne({ email: testEmail });
    if (existingUser) {
        await PreferenceModel.deleteOne({ user: existingUser._id });
        await UserModel.deleteOne({ _id: existingUser._id });
    }
});

const mockUser = {
    name: 'Clark Kent',
    email: 'clark@superman.com',
    password: 'Krypt()n8',
    preferences:['movies', 'comics']
};

let token = '';

// Auth tests

tap.test('POST /users/signup', async (t) => {
    const response = await server.post('/users/signup').send(mockUser);
    t.equal(response.status, 200);
    t.end();
});

tap.test('POST /users/signup with missing email', async (t) => {
    const response = await server.post('/users/signup').send({
        name: mockUser.name,
        password: mockUser.password
    });
    t.equal(response.status, 400);
    t.end();
});

tap.test('POST /users/login', async (t) => { 
    const response = await server.post('/users/login').send({
        email: mockUser.email,
        password: mockUser.password
    });
    t.equal(response.status, 200);
    t.hasOwnProp(response.body, 'token');
    token = response.body.token;
    t.end();
});

tap.test('POST /users/login with wrong password', async (t) => {
    const response = await server.post('/users/login').send({
        email: mockUser.email,
        password: 'wrongpassword'
    });
    t.equal(response.status, 401);
    t.end();
});

// Preferences tests

tap.test('GET /users/preferences', async (t) => {
    const response = await server.get('/users/preferences').set('Authorization', `Bearer ${token}`);
    t.equal(response.status, 200);
    t.hasOwnProp(response.body, 'preferences');
    t.same(response.body.preferences, mockUser.preferences);
    t.end();
});

tap.test('GET /users/preferences without token', async (t) => {
    const response = await server.get('/users/preferences');
    t.equal(response.status, 401);
    t.end();
});

tap.test('PUT /users/preferences', async (t) => {
    const response = await server.put('/users/preferences').set('Authorization', `Bearer ${token}`).send({
        preferences: ['movies', 'comics', 'games']
    });
    t.equal(response.status, 200);
    t.end();
});

tap.test('Check PUT /users/preferences', async (t) => {
    const response = await server.get('/users/preferences').set('Authorization', `Bearer ${token}`);
    t.equal(response.status, 200);
    t.same(response.body.preferences, ['movies', 'comics', 'games']);
    t.end();
});

// News tests

tap.test('GET /news', async (t) => {
    const response = await server.get('/news').set('Authorization', `Bearer ${token}`);
    t.equal(response.status, 200);
    t.hasOwnProp(response.body, 'news');
    t.end();
});

tap.test('GET /news without token', async (t) => {
    const response = await server.get('/news');
    t.equal(response.status, 401);
    t.end();
});



tap.teardown(async () => {
    if (mongoose.connection.readyState !== 0) {
        await mongoose.connection.close();
    }
});