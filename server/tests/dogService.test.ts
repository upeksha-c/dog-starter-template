import {describe, test, vi, expect} from 'vitest';
import {getRandomDogImage} from '../services/dogService.ts';
import { ok } from 'assert';

describe('Dog service tests', () => {
    test('Image url is same than the one returned by the API', async () => {
        
        // API response mock
        const mockAPIData = {
            message: 'https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg',
            status: 'success'   
        }

        // Mocking the global fetch function to return the mock API data
        global.fetch = vi.fn().mockResolvedValue({
            ok: true,
            status: 200,
            json: vi.fn().mockResolvedValue(mockAPIData)
        })
        const response = await getRandomDogImage();
               
        expect(global.fetch).toHaveBeenCalledOnce();
        expect(response).toBeDefined();
        expect(response.imageUrl).toBe('https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg');
        expect(response.status).toBe('success');
        
    })
});