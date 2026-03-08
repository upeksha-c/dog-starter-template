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
});