import { config } from 'dotenv';
config({ path: '.env.local' });
export default {
    testEnvironment: 'jest-environment-node',
    transform: {}
};