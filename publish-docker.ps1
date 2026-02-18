# PowerShell script to build and push Docker image to GitHub Container Registry
# Usage: .\publish-docker.ps1 -ImageName "profileon_site" -ImageTag "latest"
# Or with parameters: .\publish-docker.ps1 -GitHubUser "your-username" -GitHubToken "your-token"

param(
    [Parameter(Mandatory=$false)]
    [string]$GitHubUser,
    
    [Parameter(Mandatory=$false)]
    [string]$GitHubToken,
    
    [Parameter(Mandatory=$false)]
    [string]$ImageName = "profileon_site",
    
    [Parameter(Mandatory=$false)]
    [string]$ImageTag = "latest",
    
    [Parameter(Mandatory=$false)]
    [string]$Registry = "ghcr.io"
)

$ErrorActionPreference = "Stop"

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Docker Image Publisher for GitHub" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Load environment variables from .env.docker if parameters not provided
if (-not $GitHubUser -or -not $GitHubToken) {
    $envFile = ".env.docker"
    if (Test-Path $envFile) {
        Write-Host "Loading environment variables from $envFile..." -ForegroundColor Yellow
        Get-Content $envFile | ForEach-Object {
            if ($_ -match "^([^#][^=]+)=(.*)$") {
                $name = $matches[1].Trim()
                $value = $matches[2].Trim()
                if ($name -eq "GITHUB_USER" -and -not $GitHubUser) {
                    $GitHubUser = $value
                }
                if ($name -eq "GITHUB_TOKEN" -and -not $GitHubToken) {
                    $GitHubToken = $value
                }
            }
        }
    }
}

# Validate required parameters
if (-not $GitHubUser -or -not $GitHubToken) {
    Write-Error "GitHubUser and GitHubToken are required. Provide them as parameters or set GITHUB_USER and GITHUB_TOKEN in .env.docker file."
    Write-Host "Usage: .\publish-docker.ps1 -GitHubUser 'your-username' -GitHubToken 'your-token'" -ForegroundColor Yellow
    exit 1
}

# Build the full image name
$FullImageName = "${Registry}/${GitHubUser}/${ImageName}"

Write-Host "Image: ${FullImageName}:${ImageTag}" -ForegroundColor Yellow
Write-Host ""

# Step 1: Build the Docker image
Write-Host "[1/4] Building Docker image..." -ForegroundColor Green
docker build -t "${FullImageName}:${ImageTag}" -t "${FullImageName}:latest" .

if ($LASTEXITCODE -ne 0) {
    Write-Error "Failed to build Docker image"
    exit 1
}

Write-Host "Build completed successfully!" -ForegroundColor Green
Write-Host ""

# Step 2: Login to GitHub Container Registry
Write-Host "[2/4] Logging in to GitHub Container Registry..." -ForegroundColor Green
$GitHubToken | docker login $Registry -u $GitHubUser --password-stdin

if ($LASTEXITCODE -ne 0) {
    Write-Error "Failed to login to GitHub Container Registry"
    exit 1
}

Write-Host "Login successful!" -ForegroundColor Green
Write-Host ""

# Step 3: Push the image
Write-Host "[3/4] Pushing image to GitHub Container Registry..." -ForegroundColor Green
docker push "${FullImageName}:${ImageTag}"

if ($LASTEXITCODE -ne 0) {
    Write-Error "Failed to push image"
    exit 1
}

# Also push latest tag if different
if ($ImageTag -ne "latest") {
    docker push "${FullImageName}:latest"
}

Write-Host "Push completed successfully!" -ForegroundColor Green
Write-Host ""

# Step 4: Logout
Write-Host "[4/4] Logging out..." -ForegroundColor Green
docker logout $Registry

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Image published successfully!" -ForegroundColor Green
Write-Host "Pull with: docker pull ${FullImageName}:${ImageTag}" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
