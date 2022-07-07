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
   2. Block nhưng xóa luôn user
   3. Thiếu API unblock user
2. Brands
   1. Thiếu API xóa brand
3. Voucher:
   1. Trong API index, không return image và used fields
4. Tasks

   1. Trong API index, không return name field (null)
   2. Thiếu API xóa task

5. Banner

   1. Thiếu API xóa Banner

6. Paging: Không return tổng số page => Không paging được

7. Get all posts error:
   https://api.otodi.vn/api/admin/v1/posts

   ErrorException: Attempt to read property &quot;url&quot; on null in file /var/www/app/Http/Resources/Post/ListPostResource.php on line 34

## <red>CLIET API PROBLEMS <red>

1. Authentication
   1.1 Thiếu Login by facebook, google api
   1.2 Thiếu verify email

2. Ko trả về list mà user đang follow
3. Thiếu Verify email, send OTP
4. Thiếu API mark as sold, đánh dấu đã bán
5. Không có API trả về 1 post của mình, dù nó là waiting cũng cần trả về để update post
6. get all posts thiếu trả về like_counts
7. Thiếu API get user likes cho 1 post
