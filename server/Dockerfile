FROM openjdk:8-jdk-alpine
VOLUME /tmp
COPY ./target/tipshare-0.1.jar tipshare.jar
ENTRYPOINT ["java","-jar","/tipshare.jar"]