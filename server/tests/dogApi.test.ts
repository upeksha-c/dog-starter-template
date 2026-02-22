import { describe, test, expect, vi, beforeEach } from 'vitest';
import express from 'express';
import request from 'supertest';


vi.mock('../controllers/dogController', () => ({
    getDogImage: vi.fn().mockImplementation(async (_req, res) => {
        res.status(500).json({
            success: false,
            error: "Failed to fetch dog image: Network error"
        })
    })
}));

import dogRoutes from '../routes/dogRoutes';

describe('dogApi tests', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test('Negative test return internal server error', async () => {
        const app = express();
        app.use(express.json());
        app.use('/api/dogs', dogRoutes);
            
        const res = await request(app).get('/api/dogs/random');
        expect(res.status).toBe(500);
        expect(res.body.success).toBe(false);
        expect(res.body.error).toBe('Failed to fetch dog image: Network error');
    });
});