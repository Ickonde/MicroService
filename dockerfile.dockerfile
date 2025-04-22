# Выбор базового образа
FROM openjdk:11-jre-slim

# Установка рабочей директории
WORKDIR /app

# Копирование файла JAR приложения в контейнер
COPY target/schedule-app.jar /app/schedule-app.jar

# Открытие порта для доступа к приложению
EXPOSE 8080

# Команда для запуска приложения
CMD ["java", "-jar", "schedule-app.jar"]