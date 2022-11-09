export interface NavigationProps<T> {
  navigate: (screen: string, data: T) => void
}
