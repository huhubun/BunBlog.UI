PATH=%PATH%;C:\Program Files\7-Zip;

del "D:\BunBlog.UI.zip"
rmdir /S /Q "./.nuxt"

call npm install
call npm run build

7z a -tzip "D:\BunBlog.UI.zip" ".nuxt/" "server/" "static/" "nuxt.config.js" "package.json"