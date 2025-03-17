# Use official Node LTS (Node 20)
FROM node:20

# Create app directory
WORKDIR /usr/src/app

# Copy the entire monorepo
COPY . .

# Expose necessary ports
EXPOSE 17101 7101 17102 7102 17150 7150 17159 7159 17157 7157 17152 7152 17153 7153 17154 7154 17158 7158 17151 7151 9005
