# Use Java 17
FROM eclipse-temurin:17-jdk

# Set working directory
WORKDIR /app

# Copy jar from target folder
COPY target/*.jar app.jar

# Expose port (Render will override using PORT)
EXPOSE 8080

# Run the application
CMD ["java", "-jar", "app.jar"]
