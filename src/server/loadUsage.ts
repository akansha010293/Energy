import { promisify } from 'util'
import { readFile } from 'fs'
import path from 'path'
import Papa from 'papaparse'
import dayjs from 'dayjs'

import {
  DailyUsage,
  TimeString,
  UsagePeak,
  UsageSummary,
} from '../../src/shared'

const readFilePromise = promisify(readFile)

/** Columns that appear before the half-hourly interval data. */
const NON_INTERVAL_COLS = new Set([
  'NMI',
  'METER SERIAL NUMBER',
  'CON/GEN',
  'DATE',
  'ESTIMATED?',
])

type CsvRow = Record<string, string | number>

export async function loadUsage(): Promise<UsageSummary | undefined> {
  const filePath = path.resolve(
    './src/server/data/example-04-vic-ausnetservices-email-17122014-MyPowerPlanner.csv'
  )

  try {
    /* ---------- 1. Read + parse CSV ---------- */
    const rawCsv = await readFilePromise(filePath, { encoding: 'utf8' })

    const { data: rows } = Papa.parse<CsvRow>(rawCsv, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
    })

    /* ---------- 2. Build DailyUsage[] ---------- */
    const days: DailyUsage[] = rows.map((row) => {
      // 2a. Date -> ISO yyyy-mm-dd
      const rawDate = dayjs(row['DATE'])
      const isoDate = rawDate.format('YYYY-MM-DD')

      // 2b. Sum interval kWh & track peak
      let totalKwh = 0
      let maxKwh = -Infinity
      let maxIntervalLabel = ''

      Object.entries(row).forEach(([label, value]) => {
        if (NON_INTERVAL_COLS.has(label) || value === '') return

        const kwh = Number(value)
        if (!Number.isFinite(kwh)) return

        totalKwh += kwh
        if (kwh > maxKwh) {
          maxKwh = kwh
          maxIntervalLabel = label // e.g. "21:00 - 21:30"
        }
      })

      const usagePeak: UsagePeak = {
        hour: intervalStartToHour(maxIntervalLabel),
        // Convert energy (kWh over 30 min) into an approximate instantaneous kW
        kw: Number((maxKwh * 2).toFixed(3)),
      }

      return {
        date: isoDate,
        totalKwh: Number(totalKwh.toFixed(6)),
        averageHourlyKwh: Number((totalKwh / 24).toFixed(6)),
        usagePeak,
      }
    })

    /* ---------- 3. Aggregate fleet-wide stats ---------- */
    const totalKwh = Number(
      days.reduce((sum, d) => sum + d.totalKwh, 0).toFixed(6)
    )
    const averageDailyKwh = Number((totalKwh / days.length).toFixed(6))

    /* ---------- 4. Assemble UsageSummary ---------- */
    const summary: UsageSummary = {
      startDate: days[0]?.date ?? '',
      endDate: days[days.length - 1]?.date ?? '',
      totalKwh,
      averageDailyKwh,
      days,
    }

    return summary
  } catch (err) {
    console.error('❌ loadUsage failed:', err)
    return undefined
  }
}

/* ──────────────────────────── helpers ──────────────────────────── */

function intervalStartToHour(label: string): TimeString {
  // "21:00 - 21:30" -> "21:00"
  return (label.split(' ')[0] ?? '00:00') as TimeString
}
