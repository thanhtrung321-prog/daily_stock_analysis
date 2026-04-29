<div align="center">

# Hệ Thống Phân Tích Cổ Phiếu Thông Minh

**Công cụ AI phân tích danh mục theo dõi cho A-share / cổ phiếu Hồng Kông / cổ phiếu Mỹ**

Phân tích danh sách cổ phiếu -> tạo bảng quyết định -> gửi qua Telegram / Discord / Slack / Email / WeChat Work / Feishu.

[**Thiết Lập Nhanh**](#-thiết-lập-nhanh-trên-windows) · [**Cấu Hình Tối Thiểu**](#-cấu-hình-tối-thiểu) · [**Lệnh Hay Dùng**](#-lệnh-hay-dùng) · [**Ghi Chú Vận Hành**](#-ghi-chú-vận-hành)

[简体中文](../README.md) | [English](README_EN.md) | [繁體中文](README_CHT.md) | Tiếng Việt

</div>

## Tính Năng Chính

| Nhóm | Tính năng | Mô tả |
| --- | --- | --- |
| AI | Bảng quyết định | Kết luận một câu, điểm số, vùng mua/bán, cảnh báo rủi ro và checklist hành động |
| Phân tích | Đa chiều | Kỹ thuật, giá realtime, dòng tiền, tin tức, tâm lý, cơ bản và cấu trúc vị thế |
| Thị trường | Toàn cầu | Hỗ trợ A-share, Hồng Kông, Mỹ, chỉ số Mỹ và ETF phổ biến |
| Web | Workbench | Phân tích thủ công, cấu hình, tiến độ task, lịch sử báo cáo, backtest và portfolio |
| Agent hỏi cổ phiếu | Chat chiến lược | Hỏi đáp nhiều lượt, gọi dữ liệu realtime, K-line, chỉ báo kỹ thuật, tin tức và rủi ro |
| Tự động hóa | Chạy định kỳ | GitHub Actions, Docker, local scheduler và FastAPI/WebUI |

## Thiết Lập Nhanh Trên Windows

Yêu cầu khuyến nghị:

- Python `3.10+`
- Node.js `20+`
- PowerShell

```powershell
cd C:\Users\trung\Downloads\tools_phantich\daily_stock_analysis

python -m venv .venv
.\.venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
python -m pip install -r requirements.txt

cd apps\dsa-web
npm ci
npm run build
cd ..\..
```

Nếu PowerShell chặn activate virtualenv, chạy PowerShell bằng quyền user bình thường rồi dùng:

```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

## Cấu Hình Tối Thiểu

Tạo file `.env` ở thư mục gốc. Với cấu hình tối thiểu để mở WebUI và dùng tiếng Việt:

```env
STOCK_LIST=600519,hk00700,AAPL
REPORT_LANGUAGE=vi

WEBUI_ENABLED=true
WEBUI_HOST=127.0.0.1
WEBUI_PORT=8000
WEBUI_AUTO_BUILD=false

ADMIN_AUTH_ENABLED=false
RUN_IMMEDIATELY=false
SCHEDULE_ENABLED=false
MARKET_REVIEW_ENABLED=false

# Cần ít nhất một API key nếu muốn phân tích AI thật
GEMINI_API_KEY=
OPENAI_API_KEY=
ANTHROPIC_API_KEY=
AIHUBMIX_KEY=
```

Để phân tích thật, điền ít nhất một key AI. Ví dụ dùng Gemini:

```env
GEMINI_API_KEY=your_key_here
REPORT_LANGUAGE=vi
```

Kênh nhận thông báo là tùy chọn. Có thể thêm Telegram:

```env
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_CHAT_ID=your_chat_id
```

## Chạy Dự Án

Chạy WebUI:

```powershell
.\.venv\Scripts\Activate.ps1
python main.py --webui-only
```

Mở trình duyệt:

```text
http://127.0.0.1:8000
```

Chạy phân tích một lần qua CLI:

```powershell
python main.py --stocks 600519,hk00700,AAPL
```

Chạy thử không gửi thông báo:

```powershell
python main.py --dry-run
```

## Lệnh Hay Dùng

```powershell
python main.py --debug
python main.py --market-review
python main.py --schedule
python main.py --serve-only
uvicorn server:app --reload --host 127.0.0.1 --port 8000
```

Kiểm tra backend:

```powershell
python -m pytest -m "not network"
python -m py_compile main.py server.py
```

Kiểm tra frontend:

```powershell
cd apps\dsa-web
npm run lint
npm run build
```

## Ghi Chú Vận Hành

- `REPORT_LANGUAGE=vi` sẽ yêu cầu AI, template báo cáo và các nhãn chính xuất bằng tiếng Việt.
- Nếu chưa có API key, WebUI vẫn mở được nhưng phân tích AI sẽ báo thiếu cấu hình.
- A-share có thể dùng mã như `600519`, Hồng Kông dùng `hk00700`, Mỹ dùng `AAPL`.
- Mặc định nên chạy local bằng `127.0.0.1`. Chỉ đổi sang `0.0.0.0` khi bạn hiểu rõ rủi ro truy cập mạng.
- Không đưa API key thật vào README, issue, commit hoặc ảnh chụp màn hình.
