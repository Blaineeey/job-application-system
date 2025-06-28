FROM php:8.2-fpm

WORKDIR /var/www

# System Dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip unzip git curl

# PHP Extensions
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copy project files
COPY . .

# Set Permissions
RUN chown -R www-data:www-data /var/www

EXPOSE 8000
CMD php artisan serve --host=0.0.0.0 --port=8000
