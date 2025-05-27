import { join } from 'node:path'
import envPaths from 'env-paths'

import builderConfig from '../../../electron-builder.yml'

export const DATA_DIR = join(envPaths(builderConfig.appId, { suffix: '' }).data)
export const STATE_DATA_DIR = join(DATA_DIR, 'state')
export const EXTENSIONS_DIR = join(DATA_DIR, 'extensions')
