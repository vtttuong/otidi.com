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

### API PROBLEMS

1. User
   1.1. Get all, return wrong name -> email, no avatar returned
