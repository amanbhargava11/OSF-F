@echo off
echo Starting git initialization and push for frontend...
git init
git add .
git commit -m "Initial frontend commit"
git branch -M main
git remote remove origin 2>nul
git remote add origin https://github.com/amanbhargava11/OSF-F.git
git push -u origin main
echo Done!
