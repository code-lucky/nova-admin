namespace Entity {
  interface Palettes {
    id?: number
    name: string
    palette: string
    description?: string
    collect?: number
    visits?: number
    deleted?: boolean
    created_at?: Date
    updated_at?: Date
  }

  interface PalettesList {
    total: number
    list: Palettes[]
  }
}
