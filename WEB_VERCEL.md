# StudioLive Web — Vercel (không TikTok)

Nhánh này là bản thử nghiệm web tĩnh, độc lập với Electron và TikTok.

## Deploy

1. Trên Vercel chọn Add New → Project → Import Git Repository: ENY333/di_chua.
2. Chọn **Production Branch** là `vercel-web-no-tiktok` (hoặc deploy nhánh này làm Preview).
3. Framework Preset: **Other**. Root Directory: `./`. Build Command: để trống. Output Directory: để trống (dùng static file routing).
4. Deploy, mở URL gốc để xem dashboard, và `/scene` để mở cảnh.

## Giới hạn

- Sự kiện là dữ liệu giả lập, không đọc TikTok.
- Đồng bộ chỉ giữa các tab/cửa sổ cùng origin trong cùng trình duyệt và cùng browser profile. Không đồng bộ qua các máy hay trình duyệt khác nhau.
- Chưa chuyển toàn bộ giao diện điều khiển Electron, TTS phía server, chọn tệp âm thanh/video cục bộ, và tính năng Rạp Phim phát tệp từ PC.
- Cài đặt lưu localStorage của trình duyệt, không có tài khoản hay cơ sở dữ liệu.
- Để dùng OBS có thể mở URL `/scene` như browser source; điều khiển từ một trình duyệt/profile khác sẽ không đồng bộ nếu không có backend.
- Giữ nguyên thông báo bản quyền MIT của dự án gốc.

## Kiểm tra

Chạy web server tĩnh từ thư mục gốc và kiểm tra /, /scene, âm thanh, hiệu ứng, bảng điều khiển. Chưa có kiểm thử tự động cho bản web này.
