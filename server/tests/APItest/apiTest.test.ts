import {describe, test, expect} from 'vitest';
import request  from 'supertest';
import {app} from '../../index';

describe('Dog API tests', () => {
    test('should return dog image', async () => {
        const response = await request(app)
            .get('/api/dogs/random')

        // verify response contains status success
        expect(response.status).toBe(200);
        // verify success is true
        expect(response.body.success).toBe(true);
        // verify data is returned
        expect(response.body.data).toBeTruthy();
        // verify data contains imageUrl
        expect(response.body.data.imageUrl).toBeTruthy();
        // verify imageUrl contains string
        expect(typeof response.body.data.imageUrl).toBe('string');
    });

    test('should return 404 for invalid route', async () => {
        const response = await request(app)
            .get('/api/dogs/random-invalid-route')

        // verify response status is 404
        expect(response.status).toBe(404);
        // returned response contain error message
        expect(response.body).toBeDefined();
        expect(response.body.error).toBeDefined();
        //  verify that returned error message is correct
        expect(response.body.error).toBe('Route not found');
    });
});