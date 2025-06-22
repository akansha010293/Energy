import handler from '@/pages/api/usage'
import { testApiHandler } from 'next-test-api-route-handler'

// Use your own preferred test structure, this test is
// just here to give a helping hand figuring out plumbing
// rather than an endorsement or guideline on testing style
describe('/api/usage', () => {
  it('returns 200 OK', async () => {
    await testApiHandler({
      pagesHandler: handler,
      test: async ({ fetch }) => {
        const res = await fetch()
        expect(res.status).toBe(200)
        const jsonRes = await res.json()
        expect(jsonRes).toHaveProperty('totalKwh')
        expect(jsonRes).toHaveProperty('averageDailyKwh')
        expect(jsonRes).toHaveProperty('days')
      },
    })
  })
  it('returns 500 if an error occurs', async () => {
    // Mock the loadUsage function to throw an error
    jest.resetModules()
    jest.doMock('@/server/loadUsage', () => ({
      loadUsage: async () => {
        throw new Error('Test error')
      },
    }))
    const errorHandler = (await import('@/pages/api/usage')).default

    await testApiHandler({
      pagesHandler: errorHandler,
      test: async ({ fetch }) => {
        const res = await fetch()
        expect(res.status).toBe(500)
      },
    })
    jest.dontMock('@/server/loadUsage')
  })
})
