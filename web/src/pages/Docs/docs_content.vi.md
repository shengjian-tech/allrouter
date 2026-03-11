AllRouter.AI là cổng truy cập mô hình AI hợp nhất, được xây dựng để cung cấp kết nối mô hình AI tiện lợi, hiệu quả và tiết kiệm chi phí. Tài liệu này được viết theo góc nhìn người dùng phổ thông để giúp bạn nhanh chóng nắm được các chức năng cốt lõi và quy trình sử dụng.

# Tổng quan nền tảng

AllRouter.AI tích hợp hơn 50 mô hình nổi bật như OpenAI, Claude, Llama... Thông qua API thống nhất, bạn có thể sử dụng đầy đủ năng lực AI mà không cần chuyển đổi qua nhiều nền tảng.

Ưu điểm chính:

Thay thế liền mạch: tương thích 100% với OpenAI SDK, chỉ cần đổi `base_url`.

Định tuyến thông minh: tự động chọn mô hình chi phí thấp hơn hoặc phản hồi nhanh hơn theo quy tắc.

Độ sẵn sàng cao: hỗ trợ chuyển đổi khi lỗi để đảm bảo dịch vụ liên tục.

Quan sát thời gian thực: bảng điều khiển hiển thị chi tiết độ trễ, lượng token và chi phí.

# Bắt đầu nhanh

## Đăng ký và đăng nhập

### Đăng ký

Truy cập https://allrouter.shengjian.net/, bấm **Đăng nhập** -> **Đăng ký**, nhập tên người dùng và mật khẩu trong cửa sổ bật lên, sau đó bấm **Đăng ký** để tạo tài khoản.

![](/docs_images/img_2.png)

![](/docs_images/img_3.png)

### Đăng nhập

Truy cập https://allrouter.shengjian.net/, bấm **Đăng nhập**, nhập tên người dùng và mật khẩu, sau đó bấm **Tiếp tục** để đăng nhập vào AllRouter.AI.

![](/docs_images/img_4.png)

## Playground

Mô tả: kiểm thử tương tác với các mô hình AI trực tiếp trên web, không cần viết mã.

1. Bước 1: bấm **Playground** ở menu bên trái.

2. Bước 2: trong bảng **Cấu hình mô hình**, chọn mô hình mục tiêu ở ô **Model** (ví dụ `gpt4o`).

3. Bước 3: (tuỳ chọn) điều chỉnh thanh **Temperature** để kiểm soát độ ngẫu nhiên của đầu ra.

4. Bước 4: nhập câu hỏi vào ô nhập ở cuối vùng hội thoại bên phải.

5. Bước 5: bấm **Gửi** ở bên phải ô nhập.

Điều kiện: số dư tài khoản lớn hơn 0.

Kết quả mong đợi: AI phản hồi ngay và hiển thị chi tiết tiêu hao ở phía dưới.

![](/docs_images/img_5.png)

## Bảng điều khiển

### Dashboard

Sau khi đăng nhập vào console, bạn sẽ thấy dashboard đầu tiên. Khu vực này hiển thị trực quan trạng thái tài khoản:

Số dư hiện tại: xem hạn mức còn lại theo thời gian thực.

Thống kê sử dụng: gồm số lượt gọi, hạn mức đã dùng và token đã dùng.

Tiêu hao tài nguyên: gồm tổng hạn mức tiêu hao và tổng token tiêu hao.

Chỉ số dữ liệu: gồm TPM trung bình và RPM trung bình.

Phân tích mô hình: biểu đồ phân bố chi phí và xu hướng gọi theo từng mô hình.

![](/docs_images/img_6.png)

### Quản lý Token

Mô tả: quản lý khoá gọi API (Token), hỗ trợ giới hạn hạn mức và thời hạn hết hạn.

Để bắt đầu gọi API, bạn cần tạo token:

1. Bước 1: bấm **Quản lý Token** ở menu bên trái.

2. Bước 2: bấm **Thêm Token**.

3. Bước 3: cấu hình tên token, giới hạn hạn mức, thời hạn và giới hạn truy cập.

4. Bước 4: sau khi tạo, sao chép key token để dùng trong ứng dụng.

![](/docs_images/img_7.png)

### Nhật ký sử dụng

Mô tả: ghi lại toàn bộ cuộc gọi API đi qua gateway AllRouter.AI để phục vụ kiểm toán và phân tích chi phí.

1. Bước 1: bấm **Nhật ký sử dụng** ở menu bên trái để mở danh sách log.

2. Bước 2: chọn khoảng thời gian truy vấn (**Bắt đầu** và **Kết thúc**) trong bộ chọn ngày.

3. Bước 3: nhập điều kiện lọc trong **Tên Token**, **Tên mô hình**, **Nhóm** hoặc **Request ID**.

4. Bước 4: bấm **Tìm kiếm** để làm mới danh sách.

5. Bước 5: xem các trường **Thời gian**, **Token**, **Model**, **Chi phí**... và bấm **Chi tiết** để xem request/response đầy đủ.

![](/docs_images/img_8.png)

### Nhật ký ảnh

Mô tả: theo dõi tiến trình các tác vụ tạo ảnh (ví dụ Midjourney), bao gồm trạng thái, tiến độ và ảnh kết quả.

1. Bước 1: bấm **Nhật ký ảnh** ở menu bên trái.

2. Bước 2: tìm tác vụ theo **Task ID**, chọn thời gian và bấm **Tìm kiếm**.

3. Bước 3: bấm ảnh thu nhỏ ở cột **Ảnh kết quả** để xem ảnh.

4. Bước 4: nếu thất bại, xem nguyên nhân ở cột **Lý do lỗi**.

![](/docs_images/img_9.png)

### Nhật ký tác vụ

Mô tả: ghi vòng đời của mọi tác vụ bất đồng bộ trong hệ thống (xử lý hàng loạt, tác vụ dài, v.v.).

1. Bước 1: bấm **Nhật ký tác vụ** ở menu bên trái.

2. Bước 2: lọc theo **Task ID** hoặc khoảng thời gian, sau đó bấm **Tìm kiếm**.

3. Bước 3: phân tích thời lượng xử lý bằng cách so sánh **Thời gian gửi** và **Thời gian kết thúc**.

4. Bước 4: tuỳ chỉnh cột hiển thị qua **Cài đặt cột** ở góc trên bên phải.

![](/docs_images/img_10.png)

## Trung tâm cá nhân

### Quản lý ví

Mô tả: quản lý số dư tài khoản, hỗ trợ nhiều phương thức thanh toán và hoàn thưởng giới thiệu.

1. Bước 1: bấm **Quản lý ví** ở menu bên trái.

2. Bước 2: nhập số tiền nạp (USD) vào ô **Số tiền nạp**.

3. Bước 3: chọn phương thức thanh toán (**WeChat** hoặc **Stripe**).

4. Bước 4: chọn mức nạp hoặc bấm **Thanh toán** trực tiếp.

5. Bước 5: quét mã hoặc làm theo hướng dẫn của cổng thanh toán để hoàn tất.

Điều kiện: có phương thức thanh toán hợp lệ.

Kết quả mong đợi: sau khi thanh toán thành công, **Số dư hiện tại** được cập nhật ngay.

![](/docs_images/img_11.png)

### Cài đặt cá nhân

Mô tả: liên kết tài khoản, bảo mật, cảnh báo hạn mức và tuỳ chọn giao diện.

![](/docs_images/img_12.png)

#### Liên kết tài khoản

Mô tả: chọn và quản lý loại tài khoản mạng xã hội liên kết với tài khoản hiện tại.

![](/docs_images/img_13.png)

#### Cài đặt bảo mật

Mô tả: cấu hình token truy cập, quản lý mật khẩu, đăng nhập Passkey và xác minh hai bước.

![](/docs_images/img_14.png)

#### Tuỳ chọn

Mô tả: ngôn ngữ giao diện và các tuỳ chọn cá nhân khác.

![](/docs_images/img_15.png)

#### Cài đặt thông báo

Mô tả: các cấu hình liên quan đến thông báo, giá và quyền riêng tư.

1. Bước 1: bấm **Cài đặt cá nhân** ở menu bên trái.

2. Bước 2: mở tab **Cài đặt thông báo**.

3. Bước 3: đặt giá trị tại **Ngưỡng cảnh báo hạn mức**.

4. Bước 4: chọn **Phương thức thông báo** (ví dụ email).

5. Bước 5: bấm **Lưu cài đặt**.

Kết quả mong đợi: khi số dư thấp, hệ thống tự động gửi cảnh báo qua kênh đã chọn.

![](/docs_images/img_16.png)

#### Cài đặt giá

Nếu mô hình chưa cấu hình giá, hệ thống vẫn có thể chấp nhận gọi. Chỉ dùng khi bạn tin tưởng website, vì có thể phát sinh chi phí cao.

![](/docs_images/img_17.png)

#### Cài đặt quyền riêng tư

Khi bật, chỉ nhật ký **tiêu dùng** và **lỗi** mới ghi địa chỉ IP của client.

![](/docs_images/img_18.png)

#### Cài đặt thanh bên

![](/docs_images/img_19.png)

# Chợ mô hình

Mô tả: **Chợ mô hình** là kho tài nguyên cốt lõi của AllRouter.AI. Nơi đây hiển thị toàn bộ mô hình AI được hỗ trợ và cung cấp tra cứu giá minh bạch theo thời gian thực. Bạn có thể đánh giá chính xác chi phí gọi của từng mô hình dựa trên hệ số chính thức hoặc chi phí thực tế sau khi nạp tiền.

1. Bước 1: trên thanh điều hướng trên cùng, bấm **Chợ mô hình**. Mặc định hiển thị dạng thẻ với Model ID và giá cho 1M token.

2. Bước 2: nắm hai chế độ tính phí.

* Tính phí theo token: cho mô hình hội thoại văn bản, dựa trên token đầu vào, đầu ra và token đọc từ cache.
* Tính phí theo request: cho một số mô hình như tạo ảnh hoặc tác vụ, mỗi request trừ một mức phí cố định.

3. Bước 3: chuyển đổi linh hoạt cách hiển thị giá.

* Hiển thị giá sau nạp: hệ thống quy đổi theo tỷ lệ nạp của bạn để hiển thị số tiền thực tế bị trừ.
* Hiển thị hệ số: thẻ mô hình hiển thị hệ số tính phí so với giá chính thức.

4. Bước 4: định vị mô hình chính xác bằng thanh bên, chọn nhà cung cấp hoặc loại tính phí.

5. Bước 5: tìm kiếm và sao chép Model ID bằng ô tìm kiếm và nút **Sao chép** trên thẻ.

6. Bước 6: thao tác hàng loạt và chuyển đổi chế độ xem.

* Chế độ bảng: bấm **Chế độ bảng** ở góc trên bên phải để so sánh giá nhiều mô hình dạng danh sách gọn.
* Kết quả mong đợi: tăng rõ rệt hiệu quả cấu hình trong môi trường nhiều mô hình.

![](/docs_images/img_20.png)

# Ví dụ sử dụng

Ví dụ dưới đây minh hoạ cách dùng AllRouter trong Claude Code.

## Bước 1: cài đặt Claude Code

Điều kiện:

* Cài [Node.js 18 trở lên](https://nodejs.org/en/download/).
* Trên macOS nên cài bằng [nvm](https://github.com/nvm-sh/nvm) hoặc [Homebrew](https://formulae.brew.sh/formula/node).
* Trên Windows cần cài thêm [Git for Windows](https://git-scm.com/download/win).

Mở terminal và chạy:

npm install -g @anthropic-ai/claude-code

Kiểm tra cài đặt:

claude --version

## Bước 2: cấu hình AllRouter

1. Bước 1: đăng ký tài khoản

Truy cập nền tảng AllRouter, bấm **Đăng ký/Đăng nhập** ở góc trên bên phải và hoàn tất theo hướng dẫn.

2. Bước 2: lấy API Key

Sau khi đăng nhập, vào trung tâm cá nhân, mở **API Keys** và tạo key mới.

Để bắt đầu gọi API, bạn cần tạo token trên AllRouter:

* (1) mở **Quản lý Token**.
* (2) bấm **Thêm Token**.
* (3) cấu hình tên token, hạn mức, thời hạn và giới hạn truy cập.
* (4) sao chép key vừa tạo để dùng trong ứng dụng.

![](/docs_images/img_21.png)

Sao chép thông tin API Keys.

![](/docs_images/img_22.png)

3. Bước 3: cấu hình biến môi trường

Thiết lập trên macOS, Linux hoặc Windows (ví dụ cấu hình thủ công).

Đường dẫn tệp cấu hình khác nhau theo hệ điều hành; hãy đảm bảo JSON hợp lệ sau khi chỉnh sửa.

```bash
# Sửa hoặc tạo `settings.json`
# macOS & Linux: `~/.claude/settings.json`
# Windows: `<thu-muc-nguoi-dung>/.claude/settings.json`
# Thêm hoặc cập nhật trường `env`
# Thay `your_allrouter_api_key` bằng API Key đã lấy ở bước trước
```

```json
{
  "env": {
    "ANTHROPIC_AUTH_TOKEN": "your_allrouter_api_key",
    "ANTHROPIC_BASE_URL": "https://allrouter.shengjian.net/v1",
    "API_TIMEOUT_MS": "3000000",
    "CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC": 1
  }
}
```

```bash
# Tiếp theo sửa hoặc tạo `.claude.json`
# macOS & Linux: `~/.claude.json`
# Windows: `<thu-muc-nguoi-dung>/.claude.json`
# Thêm `hasCompletedOnboarding`
```

```json
{
  "hasCompletedOnboarding": true
}
```

Kết quả cấu hình:

```env
ANTHROPIC_AUTH_TOKEN=API Key token
ANTHROPIC_BASE_URL=https://allrouter.shengjian.net/v1
ANTHROPIC_MODEL=Tên token
```

![](/docs_images/img_23.png)

## Bước 3: bắt đầu dùng Claude Code

Sau khi cấu hình, vào thư mục mã nguồn của bạn và chạy lệnh `claude` trong terminal.

Nếu xuất hiện thông báo **Do you want to use this API key**, hãy chọn **Yes**.

![](/docs_images/img_24.png)
