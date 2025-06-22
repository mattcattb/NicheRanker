FROM oven/bun:latest AS bun
FROM mcr.microsoft.com/vscode/devcontainers/typescript-node:20
COPY --from=bun /usr/local/bin/bun* /usr/local/bin/