@echo off

wt -w 0 ngrok http --url=next-goshawk-eminent.ngrok-free.app 3000

timeout /t 3

npm start