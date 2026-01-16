# Use the official .NET 9 SDK image as the base
FROM mcr.microsoft.com/dotnet/sdk:9.0

# Install additional tools and dependencies for Umbraco development
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends \
        # Common utilities
        curl \
        wget \
        git \
        ca-certificates \
        gnupg \
        lsb-release \
        # Build tools
        build-essential \
        # Database tools
        unixodbc-dev \
        # Image processing libraries (required by Umbraco for media handling)
        libgdiplus \
        libc6-dev \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/*

# Install Node.js and npm (for frontend asset management)
RUN curl -fsSL https://deb.nodesource.com/setup_20.x | bash - \
    && apt-get install -y nodejs \
    && npm install -g npm@latest

# Install useful .NET tools
RUN dotnet tool install -g dotnet-ef \
    && dotnet tool install -g dotnet-aspnet-codegenerator \
    && dotnet tool install -g dotnet-outdated-tool \
    && dotnet tool install -g dotnet-reportgenerator-globaltool \
    && dotnet tool install -g dotnet-sonarscanner

# Add .NET tools to PATH
ENV PATH="${PATH}:/root/.dotnet/tools"

# Install SQL Server command-line tools
RUN curl -fsSL https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor -o /etc/apt/trusted.gpg.d/microsoft.gpg \
    && curl https://packages.microsoft.com/config/ubuntu/$(lsb_release -rs)/prod.list > /etc/apt/sources.list.d/mssql-release.list \
    && apt-get update \
    && ACCEPT_EULA=Y apt-get install -y mssql-tools18 unixodbc-dev \
    && echo 'export PATH="$PATH:/opt/mssql-tools18/bin"' >> /etc/bash.bashrc \
    && apt-get clean -y \
    && rm -rf /var/lib/apt/lists/*

# Set the working directory
WORKDIR /workspace

# Create a directory for HTTPS certificates
RUN mkdir -p /https

# Generate a development certificate for HTTPS
RUN dotnet dev-certs https -ep /https/aspnetapp.pfx -p password --trust

# Expose common ports
EXPOSE 5000 5001 1433

# Keep the container running
CMD ["bash"]
