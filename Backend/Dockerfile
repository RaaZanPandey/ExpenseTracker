# Use Java 17 base image (or change if needed)
FROM openjdk:17-jdk-slim

# Copy the built jar into the container
COPY target/Expensestracker-0.0.1-SNAPSHOT.jar app.jar

# Expose port 8080
EXPOSE 8080

# Run the jar file
ENTRYPOINT ["java", "-jar", "/app.jar"]
