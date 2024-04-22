FROM node:latest

WORKDIR /app

COPY . .

# Install dependencies
RUN npm install

# Expose port 3000 (assuming React app runs on port 3000)
EXPOSE 3001

# Command to run the React app
CMD ["npm", "run", "devStart"]
