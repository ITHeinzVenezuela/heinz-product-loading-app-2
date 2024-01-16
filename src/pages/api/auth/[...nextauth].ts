import NextAuth from "next-auth"
import AzureADProvider from "next-auth/providers/azure-ad"

export const authOptions = {
  // Configure one or more authentication providers
  // session: {
  //   strategy: "jwt"
  // },
  providers: [
    AzureADProvider({
      clientId: "aaaabb00-c340-4430-b100-97ae3f7f848c",
      tenantId: "f8cdef31-a31e-4b4a-93e4-5f571e91255a",
      clientSecret: "irv8Q~56Ax9PxrL34ibLquMCwhiQ2G8HdzF1PaVr",
    }),
    // ...add more providers here
  ],
}

export default NextAuth(authOptions)