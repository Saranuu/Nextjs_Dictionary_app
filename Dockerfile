# ---------- Stage 1: Build ----------
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build   # Generates /out directory


# ---------- Stage 2: Runtime ----------
FROM node:18-alpine AS runner

WORKDIR /app

# Copy only the static output from builder
COPY --from=builder /app/out ./out

# Install a lightweight static server
RUN npm install -g serve

EXPOSE 3000

# Serve static build
CMD ["serve", "out"]
