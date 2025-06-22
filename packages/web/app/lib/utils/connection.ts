export interface HeaderData {
  clientIp: string | undefined;
  userAgent: string | undefined;
}

function generateRandomIPv4() {
  const octet1 = Math.floor(Math.random() * 255) + 1;
  const octet2 = Math.floor(Math.random() * 256);
  const octet3 = Math.floor(Math.random() * 256);
  const octet4 = Math.floor(Math.random() * 256);

  return `${octet1}.${octet2}.${octet3}.${octet4}`;
}

export function getHeaders(request: Request): HeaderData {
  let clientIp =
    request.headers.get("x-forwarded-for") ||
    request.headers.get("x-real-ip") ||
    "";

  if (process.env.NODE_ENV !== "production") {
    clientIp = generateRandomIPv4();
  }

  return {
    userAgent: request.headers.get("user-agent") ?? "",
    clientIp,
  };
}
