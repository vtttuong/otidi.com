<style>
red { color: #e03131 }
yellow { color: yellow }
</style>

# Getting Started & Installation

For getting started with the template you have to follow the below procedure. First navigate to the `packages` directory. Then run below command for getting started with specific part.

```bash
# on packages directory
yarn
```

## Admin

### Configuration

1. Go to `/packages/admin` folder.
2. Copy the contents of `.env.local` into a new file called `.env`

For starting the admin dashboard part with corresponding api data run below commands.

```bash
# for dev mode run below command
yarn dev:admin

```

```bash
# account login
email: admin01@gmail.com
password: 123456

```

## Shop Rest

### Configuration

1. Go to `/packages/shop-rest` folder.
1. Copy the contents of `.env.local.sample` into a new file called `.env.local`

For starting the shop-rest part with corresponding api run below commands.

```bash
# for dev mode run below command
yarn dev:shop-rest

```

```bash
# account login
email: miinhnguyen98@gmail.com
password: min123456

```

## <red>ADMIN API PROBLEMS <red>

1. Users
   1. Return nhầm name thành email, name return null.
   2. Thiếu API unblock user
   3. /api/v1/users/2  
      Khi user đã bị block thì không lấy được info của User đó
2. Brands
   1. Thiếu API xóa brand
   2. Không update được logo
3. Voucher:
   1. Trong API index
      {{host}}/api/{{type}}/v1/vouchers?page=1&count=10&order_by=id&dir=desc
      , không return image và used fields
4. Tasks

   1. Trong API index, không return name field (null)
   2. Thiếu API xóa task

5. Banner

   1. Thiếu API xóa Banner

6. Paging: Không return tổng số page => Không paging được


7. Get all posts error:
   https://api.otodi.vn/api/admin/v1/posts

   ErrorException: Attempt to read property &quot;url&quot; on null in file /var/www/app/Http/Resources/Post/ListPostResource.php on line 34

## <red>CLIENT API PROBLEMS <red>

1. Authentication
   1.1 Thiếu Login by facebook, google api
   1.2 Thiếu verify email

2. Ko trả về list mà user đang follow
3. Thiếu Verify email, send OTP
4. Thiếu API mark as sold, đánh dấu đã bán
5. Không có API trả về 1 post của mình, dù nó là waiting cũng cần trả về để update post

6. get all posts thiếu trả về like_counts

7. Thiếu API get user likes cho 1 post

8. https://api.otodi.vn/api/client/v1/channels => bug =>
   ErrorException: Attempt to read property &quot;id&quot; on null in file /var/www/app/Http/Resources/Channel/ListChannelResource.php on line 30

9. Thanh toán ko thành công những vẫn cộng tiền vào ballance
10. Update đưa về trạng thái đã bán => sai

11. Lỗi pusher server => ko nhận và nhắn tin realtime được
12. Get all channels {{host}}/api/{{type}}/v1/channels => lỗi
    ErrorException: Attempt to read property &quot;id&quot; on null in file /var/www/app/Http/Resources/Channel/ListChannelResource.php on line 30

13. Đối với 1 bài post, khi tạo 1 chat vs author về bài post này, thì sau này nếu ấn tạo chat vs cũng author này và cũng vs post này thì ko nên tạo chat mới mà trả về chat id đã tạo

14. VOUCHERS:
    /api/client/v1/vouchers
    không trả về levels đối với loại voucher persional,
    không trả về số lượng đã sử dụng

15. /api/index/v1/users/2/followers
   Khi đã block 1 user thì call api mọi thứ mà có user đó đều bị lỗi
   khi gọi 1 trip của người đó, hoặc gọi profile của 1 người khác mà user này follow hoặc review
   ErrorException: Attempt to read property &quot;id&quot; on null in file /var/www/app/Http/Resources/UserFollow/ListUserFollowResource.php on line 24

