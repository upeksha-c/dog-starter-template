import {describe, test, expect, vi } from 'vitest';
import { getDogImage } from '../controllers/dogController';
import * as dogService from '../services/dogService';

//mock response object
const createMockResponse = () => {
    const res: any = {};
    res.json = vi.fn();
    return res
}

describe('Tests for dogController', () => {
    test('Returns a random dog image successfully', async () => {
        const mockDogData = {
            success: true,
            data: {
                imageUrl: 'https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg',
                status: 'success'
            }
        }
        

        const req: any = {};
        const res = createMockResponse();
        
        vi.spyOn(dogService, 'getRandomDogImage').mockResolvedValue({
            imageUrl: 'https://images.dog.ceo/breeds/hound-afghan/n02088094_1003.jpg',
            status: 'success'
        });
        await getDogImage(req, res);

        expect(res.json).toHaveBeenCalledWith(mockDogData);
    });
});