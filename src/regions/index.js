import { toPublicConfig } from './helpers.js'
import { HK_ZONES, region as hk } from './hk.js'
import { IN_AREAS, region as india } from './in.js'
import { JP_AREAS, region as jp } from './jp.js'
import { KR_AREAS, region as kr } from './kr.js'
import { getRegion, hasRegion, listRegions, registerRegions } from './registry.js'
import { SG_AREAS, region as sg } from './sg.js'
import { TH_AREAS, region as th } from './th.js'
import { TW_AREAS, region as tw } from './tw.js'
import { TAX_FREE_STATE_CODES, US_STATE_MAP, US_STATES } from './us.js'
import { region as us } from './us.js'
import { region as usTaxFree } from './usTaxFree.js'
import { VN_AREAS, region as vn } from './vn.js'

registerRegions([us, usTaxFree, hk, sg, jp, tw, th, vn, kr, india])

export {
  getRegion,
  hasRegion,
  HK_ZONES,
  IN_AREAS,
  JP_AREAS,
  KR_AREAS,
  listRegions,
  SG_AREAS,
  TAX_FREE_STATE_CODES,
  TH_AREAS,
  toPublicConfig,
  TW_AREAS,
  US_STATE_MAP,
  US_STATES,
  VN_AREAS
}
