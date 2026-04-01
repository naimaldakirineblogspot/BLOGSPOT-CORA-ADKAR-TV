@echo off
echo ===========================================
echo NETTOYAGE ET REINSTALLATION NPM POUR VERCEL
echo ===========================================

:: 1. Suppression du dossier node_modules
if exist node_modules (
    echo Suppression de node_modules...
    rmdir /s /q node_modules
) else (
    echo Le dossier node_modules n'existe pas, on continue.
)

:: 2. Suppression du fichier lock (pour recalculer les versions)
if exist package-lock.json (
    echo Suppression de package-lock.json...
    del /f /q package-lock.json
)

:: 3. Nettoyage du cache npm (par securite)
echo Nettoyage du cache npm...
call npm cache clean --force

:: 4. Reinstallation propre
echo Reinstallation des paquets...
call npm install

echo ===========================================
echo TERMINE ! Vous pouvez maintenant :
echo 1. Verifier si l'avertissement apparait encore.
echo 2. Faire un 'git commit' et 'git push' vers Vercel.
echo ===========================================
pause