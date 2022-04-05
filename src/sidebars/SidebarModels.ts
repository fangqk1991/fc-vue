export interface MenuMainNode {
  uid?: string
  titleEn: string
  titleZh: string
  icon: string
  links: MenuSubNode[]
}

export interface MenuSubNode {
  titleEn: string
  titleZh: string
  path?: string
  isHyperlink?: boolean
  url?: string
}
