cd %CD%\source
cmd.exe /K "(Taskkill /IM node.exe /F & npm run mvc-build)"
exit