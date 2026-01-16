# Dev Container for .NET 9 and Umbraco Development

This dev container provides a complete development environment for building Umbraco applications and custom .NET APIs with .NET 9.

## Features

### Core Technologies
- **.NET 9 SDK** - Latest .NET SDK with all development tools
- **Node.js 20** - For frontend asset management (npm, webpack, gulp, etc.)
- **SQL Server 2022** - Developer edition running in a separate container
- **Azure CLI** - For Azure deployments and management
- **Git & GitHub CLI** - Version control and GitHub integration

### Development Tools
- **Entity Framework Core Tools** (`dotnet-ef`) - Database migrations and scaffolding
- **ASP.NET Code Generator** (`dotnet-aspnet-codegenerator`) - Scaffolding for MVC, API controllers
- **SQL Server Command-Line Tools** (`sqlcmd`) - Database management
- **Image Processing Libraries** (`libgdiplus`) - Required for Umbraco media handling
- **Build Tools** - Complete build toolchain for native dependencies

### VS Code Extensions (Auto-installed)
- C# Dev Kit and language support
- Docker integration
- EditorConfig support
- IntelliCode
- ESLint & Prettier for frontend code
- REST Client for API testing
- .NET Test Explorer

## Getting Started

### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop) installed and running
- [Visual Studio Code](https://code.visualstudio.com/) installed
- [Dev Containers extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) for VS Code

### Opening the Dev Container

1. Clone this repository
2. Open the folder in Visual Studio Code
3. When prompted, click "Reopen in Container" (or use Command Palette: `Dev Containers: Reopen in Container`)
4. Wait for the container to build and start (first time may take several minutes)
5. The post-create script will run automatically to set up the environment

### Verifying the Setup

Once the container is running, open a terminal in VS Code and verify:

```bash
# Check .NET version
dotnet --version
# Should show 9.0.x

# Check Node.js version
node --version
# Should show v20.x.x

# Check SQL Server connection
sqlcmd -S localhost -U sa -P YourStrong@Passw0rd -C -Q "SELECT @@VERSION"
# Should connect and show SQL Server 2022 version
```

## SQL Server Configuration

The dev container includes a SQL Server 2022 instance running in a separate container:

- **Server**: `localhost` or `127.0.0.1`
- **Port**: `1433`
- **Username**: `sa`
- **Password**: `YourStrong@Passw0rd`
- **Trust Server Certificate**: `True`

### Connection Strings

For Umbraco projects, use this connection string format:

```
Server=localhost,1433;Database=UmbracoDb;User Id=sa;Password=YourStrong@Passw0rd;TrustServerCertificate=True;
```

**Note**: Change the default SA password in production environments! Update it in `.devcontainer/docker-compose.yml`.

## Creating a New Umbraco Project

To create a new Umbraco CMS project inside the dev container:

```bash
# Install Umbraco templates
dotnet new install Umbraco.Templates

# Create a new Umbraco project
dotnet new umbraco -n MyUmbracoSite

# Navigate to the project
cd MyUmbracoSite

# Run the project
dotnet run
```

Then open your browser to `http://localhost:5000` (or `https://localhost:5001`) and follow the Umbraco installation wizard.

## Creating a Custom .NET API

To create a custom .NET Web API alongside Umbraco:

```bash
# Create a new Web API project
dotnet new webapi -n MyCustomApi

# Navigate to the project
cd MyCustomApi

# Add Entity Framework Core (if needed)
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Microsoft.EntityFrameworkCore.Design

# Run the API
dotnet run
```

## Working with Multiple Projects

For a solution with both Umbraco and a custom API:

```bash
# Create a solution
dotnet new sln -n MySolution

# Add projects to the solution
dotnet sln add MyUmbracoSite/MyUmbracoSite.csproj
dotnet sln add MyCustomApi/MyCustomApi.csproj

# Restore all projects
dotnet restore

# Build all projects
dotnet build
```

## Port Configuration

The following ports are forwarded from the container to your host machine:

- **5000**: Kestrel HTTP
- **5001**: Kestrel HTTPS
- **1433**: SQL Server
- **5173**: Vite dev server (for modern frontend frameworks)
- **3000**: Node.js dev server (for frontend development)

You can access your applications at:
- HTTP: http://localhost:5000
- HTTPS: https://localhost:5001

## Umbraco-Specific Features

### Image Processing
The container includes `libgdiplus`, which is required for Umbraco's image processing features (resizing, cropping, etc.).

### Media Storage
By default, Umbraco stores media files in the `wwwroot/media` folder. These files are persisted through the volume mount.

### Database Persistence
SQL Server data is stored in a Docker volume (`mssql-data`), ensuring your databases persist even when containers are rebuilt.

## Environment Variables

The following environment variables are pre-configured:

- `ASPNETCORE_ENVIRONMENT=Development`
- `ASPNETCORE_URLS=http://+:5000;https://+:5001`
- `DOTNET_CLI_TELEMETRY_OPTOUT=1` - Disables telemetry
- `DOTNET_SKIP_FIRST_TIME_EXPERIENCE=1` - Skips first-run experience

Connection strings are also pre-configured for SQL Server access.

## Customization

### Adding More Tools

Edit `.devcontainer/Dockerfile` to add additional tools:

```dockerfile
RUN apt-get update && apt-get install -y \
    your-package-here
```

### Adding VS Code Extensions

Edit `.devcontainer/devcontainer.json` and add extension IDs to the `extensions` array:

```json
"extensions": [
  "your.extension.id"
]
```

### Changing SQL Server Password

Update the password in `.devcontainer/docker-compose.yml` (both `SA_PASSWORD` environment variable and connection strings).

## Troubleshooting

### SQL Server Connection Issues

If you can't connect to SQL Server:

1. Wait for SQL Server to fully start (check with `docker ps`)
2. Verify the container is healthy: `docker ps --format "{{.Names}}: {{.Status}}"`
3. Check SQL Server logs: `docker logs <sql-container-name>`

### Port Conflicts

If ports are already in use on your host machine:

1. Edit `.devcontainer/docker-compose.yml`
2. Change the port mappings (e.g., `"1433:1433"` to `"1434:1433"`)
3. Update connection strings accordingly

### Container Build Failures

If the container fails to build:

1. Ensure Docker Desktop is running
2. Check Docker Desktop has enough resources (Memory: 4GB+, Disk: 20GB+)
3. Try rebuilding without cache: Command Palette → `Dev Containers: Rebuild Container Without Cache`

## Additional Resources

- [Umbraco Documentation](https://docs.umbraco.com/)
- [.NET 9 Documentation](https://docs.microsoft.com/en-us/dotnet/)
- [Dev Containers Documentation](https://code.visualstudio.com/docs/devcontainers/containers)
- [SQL Server on Linux](https://docs.microsoft.com/en-us/sql/linux/)

## License

This dev container configuration is provided as-is for development purposes.
