# Build stage
FROM maven:3.8-openjdk-8 AS builder

WORKDIR /app

# Copy only pom.xml first to cache dependencies
COPY pom.xml .
RUN mvn dependency:go-offline

# Now copy the source code
COPY src ./src

# Build the application
RUN mvn package

# Production stage
FROM nginx:alpine

# Copy the built application from the builder stage
COPY --from=builder /app/target/apache-guacamole-player-1.1.0-1 /usr/share/nginx/html

# Copy custom nginx configuration
COPY src/main/webapp/nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
