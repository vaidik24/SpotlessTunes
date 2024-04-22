# Dockerfile for React frontend
FROM node:latest

WORKDIR /app

COPY . .

# Install dependencies
RUN npm install

# Expose port 3000 (assuming React app runs on port 3000)
EXPOSE 3000

# Command to run the React app
CMD ["npm", "run", "dev","--","--host","0.0.0.0"]
