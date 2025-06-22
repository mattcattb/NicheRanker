export async function createSession() {}

export async function validateSession(token: string) {
  return {
    session: undefined,
    user: undefined,
  };
}
