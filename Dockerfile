FROM webdevops/php-nginx:8.2-alpine

ENV WEB_DOCUMENT_ROOT /app/public

WORKDIR /app

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

COPY . /app

COPY ./.env.example .env

RUN apk add --no-cache nodejs npm
RUN apk --no-cache update && apk --no-cache add \
    bash \
    curl \
    libpng-dev \
    libjpeg-turbo-dev \
    freetype-dev \
    zip \
    libzip-dev \
    icu-dev \
    libxml2-dev

RUN mkdir -p storage/framework/sessions storage/framework/views storage/framework/cache
    
COPY ./scripts/* /usr/local/bin/
RUN chmod +x /usr/local/bin/entrypoint.sh

CMD ["/usr/local/bin/entrypoint.sh"]


EXPOSE 80
