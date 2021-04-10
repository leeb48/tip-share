FROM maven:3.8.1-jdk-11 as builder
COPY src /app/src
COPY pom.xml /app
RUN mvn -f /app/pom.xml clean package -B

FROM openjdk:8-jdk-alpine

ARG SPRING_BOOT_PROFILE
ARG API_KEY

ENV SPRING_BOOT_PROFILE ${SPRING_BOOT_PROFILE}
ENV API_KEY ${API_KEY}

VOLUME /tmp
COPY --from=builder /app/target/tipshare-0.1.jar tipshare.jar
ENTRYPOINT ["java","-jar","/tipshare.jar"]