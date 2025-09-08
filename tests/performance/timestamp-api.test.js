/**
 * Performance Test: Unix Timestamp Converter API
 * Tool: k6 (https://k6.io)
 *
 * Description:
 * This is a minimal performance test to evaluate the responsiveness and stability
 * of the public Unix Timestamp Converter API:
 * https://helloacm.com/api/unix-timestamp-converter/
 *
 * Scenario:
 * - Simulate 10 virtual users making concurrent requests over 15 seconds.
 * - Each user sends a GET request to convert a formatted date string to a Unix timestamp.
 *
 * What’s Being Tested:
 * - Since we dont have access to tested API testing scope was limmited to:
 * - Functional correctness: the API should return a valid Unix timestamp (numeric string).
 * - Performance under light concurrent load.
 *
 * Key Metrics Tracked:
 * - Latency:
 *     - http_req_duration: Total time for requests (including DNS, TCP, TLS, server processing).
 *     - http_req_waiting: Time to first byte (TTFB).
 *     - p(95) latency: The 95th percentile latency — meaning 95% of requests finish under this threshold.
 * - Throughput:
 *     - Number of requests handled per second.
 * - Error Rate:
 *     - % of requests not returning 200 OK or incorrect response format.
 *
 * Notes:
 * - This is a public API. Do not stress test it or send high-volume traffic.
 * - Keep VUs and duration low to avoid being rate-limited or blocked.
 */

import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    vus: 3,
    duration: '15s',
    thresholds: {
        // 95% of requests must complete below 300ms
        http_req_duration: ['p(95)<300'],

        // Less than 1% of requests should fail
        http_req_failed: ['rate<0.01'],

        // At least 99% of checks must pass
        checks: ['rate>0.99'],
    }
};

const BASE_URL = 'https://helloacm.com/api/unix-timestamp-converter/?cached&s=';

const tests = [
    {
        input: '1970-01-01%201:2:03',
        name: 'date → timestamp',
        expectedPattern: /^\d+$/, // e.g. 1451613802
    },
    {
        input: '1451613802',
        name: 'timestamp → date',
        expectedPattern: /^"?\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}"?$/, // handles with or without quotes
    },
    {
        input: 'invalid-date',
        name: 'invalid input',
        expectedPattern: /^false$/,
    }
];

export default function () {
    for (const test of tests) {
        const res = http.get(`${BASE_URL}${test.input}`);
        const isSuccess = check(res, {
            [`${test.name} -> status 200`]: (r) => r.status === 200,
            [`${test.name} -> expected format`]: (r) => test.expectedPattern.test(r.body),
        });

        if (!isSuccess) {
            console.error(`❌ Test failed: ${test.name}, Response: ${res.body}`);
        }

        sleep(1.5); // slower pacing to avoid blocking
    }
}

