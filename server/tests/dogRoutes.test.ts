import { test, describe, expect, vi, beforeEach } from 'vitest';
import request from 'supertest';
import express from 'express';

// Mock the dogcontroller
vi.mock('../controllers/dogController', () => ({
    getDogImage: vi.fn().mockImplementation(async (_req, res) => {
        res.json({
            success: true,
            data: {
                imageUrl: 'https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg',
                status: 'success'
            }
        });
    })
}));

import dogRoutes from '../routes/dogRoutes';

describe('Tests for dog routes', () => {
    beforeEach(() => {
        vi.clearAllMocks(); // Clear call history before each test
    });

    test('Returns a random dog image successfully', async () => {
        
        const app = express();
        app.use('/api/dogs', dogRoutes);

        const res = await request(app).get('/api/dogs/random');

        expect(res.status).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.data.imageUrl).toBe('https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg');

    });
});