import { User } from '../models/userProperties.js';
import { isActivatedUser } from './activateUserSchema.js';

describe('isActivatedUser', () => {
	it.each([
		{
			age_range: '',
			capital_level: '',
			investing_goals: [],
			risk_preference: '',
		},
		{
			age_range: null,
			capital_level: null,
			investing_goals: null,
			risk_preference: null,
		},
	])('should return false for non-activated users', (user) => {
		expect(isActivatedUser(user as unknown as User)).toBe(false);
	});

	it('should return false for a partially-activated user', () => {
		const user = {
			age_range: '18-24',
			capital_level: '10000',
			investing_goals: ['retirement'],
		};
		expect(isActivatedUser(user as unknown as User)).toBe(false);
	});
	
  it('should return false for users with malformed data', () => {
		const user = {
			age_range: '800',
			capital_level: '0',
			investing_goals: ['diamond_chains'],
			risk_preference: 'medium',
		};
		expect(isActivatedUser(user as unknown as User)).toBe(false);
	});

	it('should return true for an activated user', () => {
		const user = {
			age_range: '1-18',
			capital_level: '10000',
			investing_goals: ['retirement'],
			risk_preference: 'medium',
		};
		expect(isActivatedUser(user as unknown as User)).toBe(true);
	});
});
