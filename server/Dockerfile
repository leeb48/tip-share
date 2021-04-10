FROM openjdk:8-jdk-alpine

ARG SPRING_BOOT_PROFILE
ARG API_KEY

ENV SPRING_BOOT_PROFILE ${SPRING_BOOT_PROFILE}
ENV API_KEY ${API_KEY}

VOLUME /tmp
COPY ./target/tipshare-0.1.jar tipshare.jar
COPY ./target/ .
ENTRYPOINT ["java","-jar","/tipshare.jar"]