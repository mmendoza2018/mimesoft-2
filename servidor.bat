@echo off
REM ---------------------------------------------------------------------------
REM  Servidor local para ver la web.
REM
REM  Doble clic sobre este archivo y se abre en el navegador. Se queda corriendo
REM  en su propia ventana: no depende de Claude Code ni de ninguna sesion, asi
REM  que no se cae solo. Para pararlo, cierra la ventana negra o pulsa Ctrl+C.
REM
REM  Hace falta un servidor porque el JS usa modulos ES y el navegador los
REM  bloquea si se abre el index.html con doble clic (file://).
REM ---------------------------------------------------------------------------

cd /d "%~dp0"

echo.
echo   Mimesoft - servidor local
echo   =========================
echo.
echo   http://127.0.0.1:8765
echo.
echo   Deja esta ventana abierta mientras trabajas.
echo   Para parar el servidor: cierra la ventana o pulsa Ctrl+C.
echo.

start "" http://127.0.0.1:8765

python -m http.server 8765 --bind 127.0.0.1

REM Si llega aqui es que python fallo o se detuvo el servidor.
echo.
echo   El servidor se detuvo.
echo   Si ves un error arriba, comprueba que Python este instalado: python --version
echo.
pause
