@echo off

echo Are you sure you want to remove the node_modules directory and run clean installation of project dependencies? (Y/N)
set /p confirm=

if /i "%confirm%"=="Y" (
  cd %CD%
  cmd.exe /K "(rmdir /S node_modules & del package-lock.json & npm install)"
) else (
  echo Removal of node_modules directory cancelled.
)