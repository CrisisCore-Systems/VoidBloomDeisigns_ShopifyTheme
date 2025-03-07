@echo off
:: VoidBloomDesign Theme Deployment Script for Windows

:: Store URL
set STORE_URL=your-store.myshopify.com

echo === VoidBloomDesign Theme Deployment ===

:: Step 1: Login to Shopify store
echo Logging in to Shopify store...
shopify login --store=%STORE_URL%

:: Step 1.5: Verify store connection
echo Verifying store connection...
shopify store info
if %ERRORLEVEL% NEQ 0 (
  echo [ERROR] Failed to connect to store. Please check your store URL and try again.
  exit /b 1
)

:: Step 2: Run validation scripts
echo Running theme validator...
node debug-theme.js
if %ERRORLEVEL% NEQ 0 (
  echo [ERROR] Validator found errors. Fix them before continuing.
  exit /b 1
)

echo Fixing stylesheet tags...
bash fix-stylesheet-tags.sh

:: Step 3: Run Shopify theme check
echo Running Shopify theme check...
shopify theme check
if %ERRORLEVEL% NEQ 0 (
  echo [WARNING] Theme check found issues. Review them before continuing.
  set /p CONTINUE=Continue with deployment? (y/n): 
  if /i "%CONTINUE%" NEQ "y" (
    echo Deployment aborted.
    exit /b 1
  )
)

:: Step 4: Deploy the theme
echo Deploying theme...
shopify theme push

:: Step 5: Open the theme in browser
if %ERRORLEVEL% EQU 0 (
  echo [SUCCESS] Deployment successful!
  
  :: Ask if they want to open the theme
  set /p OPEN=Open theme in browser? (y/n): 
  if /i "%OPEN%"=="y" (
    shopify theme open
  )
) else (
  echo [ERROR] Deployment failed. Please check the error messages above.
  exit /b 1
)

echo Deployment process completed.
