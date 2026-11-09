@echo off
title Push Sistem Absensi ke GitHub
echo =======================================================
echo MENGHUBUNGKAN DAN MENGUNGGAH KE REPOSITORY GITHUB:
echo https://github.com/rizkykurniawan250515-cmd/Absensi-Guru-dan-Murid.git
echo =======================================================
echo.

cd /d "%~dp0"

echo [1/5] Inisialisasi Git...
git init

echo.
echo [2/5] Menambahkan remote repository...
git remote remove origin 2>nul
git remote add origin https://github.com/rizkykurniawan250515-cmd/Absensi-Guru-dan-Murid.git

echo.
echo [3/5] Menyiapkan file ke Git...
git add .

echo.
echo [4/5] Melakukan Commit...
git commit -m "Initial commit: Sistem Absensi Guru dan Siswa SMP Dyah Pithaloka dengan Firebase & Tema Maroon Gold"

echo.
echo [5/5] Mengunggah (Push) ke branch main di GitHub...
git branch -M main
git push -u origin main

echo.
echo =======================================================
echo PROSES SELESAI!
echo =======================================================
pause

