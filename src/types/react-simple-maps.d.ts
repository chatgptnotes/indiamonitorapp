declare module 'react-simple-maps' {
  import { ComponentType, ReactNode } from 'react'

  export interface ComposableMapProps {
    projection?: string
    projectionConfig?: {
      center?: [number, number]
      scale?: number
    }
    style?: React.CSSProperties
    children?: ReactNode
  }

  export interface GeographiesProps {
    geography: string
    children: (args: { geographies: any[] }) => ReactNode
  }

  export interface GeographyProps {
    geography: any
    onMouseEnter?: (event: React.MouseEvent) => void
    onMouseLeave?: () => void
    onClick?: () => void
    style?: {
      default?: React.CSSProperties
      hover?: React.CSSProperties
      pressed?: React.CSSProperties
    }
  }

  export interface MarkerProps {
    coordinates: [number, number]
    children?: ReactNode
  }

  export const ComposableMap: ComponentType<ComposableMapProps>
  export const Geographies: ComponentType<GeographiesProps>
  export const Geography: ComponentType<GeographyProps>
  export const Marker: ComponentType<MarkerProps>
}