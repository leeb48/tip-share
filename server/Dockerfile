FROM openjdk:8-jdk-alpine

ARG SPRING_BOOT_PROFILE
ARG API_KEY

ENV SPRING_BOOT_PROFILE ${SPRING_BOOT_PROFILE}
ENV API_KEY ${API_KEY}

RUN mvn -f server/pom.xml package -B 

VOLUME /tmp
COPY ./target/ .
ENTRYPOINT ["java","-jar","/tipshare-0.1.jar"]