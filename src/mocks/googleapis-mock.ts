// Mock implementation
export const google = {
  auth: {
    OAuth2: class OAuth2 {
      constructor() {
        console.log('Mock Google OAuth2');
      }
      setCredentials() {}
    }
  },
  gmail: () => ({
    users: {
      messages: {
        list: async () => ({ data: { messages: [] } }),
        get: async () => ({ data: { payload: { headers: [] }, snippet: '' } })
      }
    }
  })
};
