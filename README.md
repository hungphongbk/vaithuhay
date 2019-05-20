# vaithuhay
Vaithuhay frontend powerred by Vue.js

## Technical Specs & Requirement
- Node.js v11.x
- Webpack v3
- Vue.js v2.6.x

## Guide

### Development

1. Xem lại các script trong package.json, nếu sử dụng hệ điều hành window cần tinh chỉnh lại quá trình chạy lệnh một cách thích hợp.
2. Copy file `.env.example`, rename thành `.env`
3. Tạo một self-signed certificate (vì dev sẽ phải chạy trên https để pass warning của Chrome khi chạy cùng vaithuhay.com). Hướng dẫn tạo self-signed certificate trên Ubuntu [tại đây](https://websiteforstudents.com/self-signed-certificates-ubuntu-17-04-17-10/). Sau khi tạo xong, thu được hai tệp `*.crt` và `*.key`, điền đường dẫn tuyệt đối của hai tệp đó vào hai biến tương ứng trong tệp `.env`
4. Chạy lệnh dev: `npm run dev`
