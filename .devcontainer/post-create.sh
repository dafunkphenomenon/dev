#!/bin/bash

# Post-create script for dev container
echo "Running post-create setup..."

# Ensure .NET tools are in PATH
export PATH="$PATH:/root/.dotnet/tools"

# Trust the HTTPS development certificate
dotnet dev-certs https --trust || echo "Note: HTTPS certificate trust may require manual action"

# Install global npm packages useful for Umbraco development
echo "Installing global npm packages..."
npm install -g gulp-cli bower webpack webpack-cli

# Restore .NET workload for web development
echo "Installing .NET workloads..."
dotnet workload update || echo "Workload update completed with warnings"

# Display installed versions
echo ""
echo "======================================"
echo "Development Environment Ready!"
echo "======================================"
echo ".NET SDK Version:"
dotnet --version
echo ""
echo "Node.js Version:"
node --version
echo ""
echo "npm Version:"
npm --version
echo ""
echo "SQL Server tools are available via:"
echo "  - sqlcmd (use -S localhost -U sa -P YourStrong@Passw0rd -C)"
echo ""
echo "Global .NET Tools installed:"
dotnet tool list -g
echo ""
echo "======================================"
echo "Ready for Umbraco development!"
echo "======================================"
