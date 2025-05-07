declare module '@sidebase/nuxt-session' {
  export function useSession(event?: any): {
    data: Ref<{ user?: {
      username: string
      role: string
    } }>
    update: (data: any) => Promise<void>
    clear: () => Promise<void>
  }
}
