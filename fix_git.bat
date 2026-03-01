@echo off
echo Untracking node_modules and dist from frontend repo...
git rm -r --cached node_modules
git rm -r --cached dist
git add .
git commit -m "chore: remove node_modules and dist from git tracking"
echo Pushing changes...
git push origin main
echo Done!
