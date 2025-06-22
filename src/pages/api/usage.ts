import type { NextApiRequest, NextApiResponse } from 'next'

import { UsageSummary } from '@/shared'
import { loadUsage } from '@/server/loadUsage'
// import { sampleUsage } from '@/server/sampleUsage'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<UsageSummary>
) {
  // Uncomment the `loadUsage` function and implement that, whilst
  // commenting out the `sampleUsage` function. You may leave the
  // `simulateSlowNetwork` if you wish to do so.`
  await simulateSlowNetwork()
  const usageData = await loadUsage()
  // const xx = sampleUsage()
  // console.log('>>>>', xx)

  //Handle the error state
  if (!usageData) {
    res.status(500).json({
      totalKwh: 0,
      averageDailyKwh: 0,
      startDate: '',
      endDate: '',
      days: [],
    })
    return
  }
  res.status(200).json(usageData)
}

function simulateSlowNetwork(delayMs = 1500): Promise<void> {
  console.log(`Simulating network delay of ${delayMs}ms`)
  return new Promise((resolve) => setTimeout(resolve, delayMs))
}
