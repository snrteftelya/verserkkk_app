FROM maven:3.9.6-eclipse-temurin-17 AS build

WORKDIR /app

COPY pom.xml .
# загрузка зависимостей
RUN mvn clean verify --fail-never -DskipTests
COPY src ./src
RUN mvn package -DskipTests

FROM eclipse-temurin:21-alpine

WORKDIR /app

RUN apk --no-cache add curl

COPY --from=build /app/target/*.jar app.jar
COPY .env .env

EXPOSE 8080

ENTRYPOINT ["java","-jar","app.jar"]