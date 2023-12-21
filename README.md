<p align="center">
  <a href="https://bitbucket.org/gogreendevteam/qr-base-be/src" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a> 
</p>

# Installation
#### Install @nestjs/cli
```
npm i -g @nestjs/cli
```
#### Install dependencies
```
yarn
```
#### Config env
```
cp .env.example .env
```

```
NODE_ENV=local | dev | staging | production
PORT=Port của app

# Database
DB_HOST=Host của database
DB_PORT=Port của database
DB_USERNAME=Username của database
DB_PASSWORD=Password của database
DB_NAME=Tên của database
DB_SCHEMA=Schema của database
ADMIN_USERNAME=Username của admin (migration)
ADMIN_PASSWORD=Password của admin (migration)

# Redis
REDIS_HOST=Host của redis
REDIS_PORT=Port của redis
REDIS_DB=Index của redis
REDIS_PASSWORD=Password của redis
REDIS_PREFIX=Tiền tố của redis

# JWT
SECRET_JWT=Secret cho access token

#Mail
MAIL_HOST=Host của gmail
MAIL_FROM=Tài khoản gmail gửi đi
MAIL_USER=User của gmail
MAIL_PASS=Pass của gmail
```

# Build & Run
#### Run on Dev
```
yarn start:dev
```
#### Run on Production
```
yarn build && yarn start:prod
```
#### Build
```
yarn build
```
# Docker & Docker compose
#### Build image
```
docker build -t base-be ./cicd
```
#### Run on docker compose
##### Config env
```
cp .env.example .env
```
```
NODE_ENV=local
PORT=3000

# Database
DB_HOST=db
DB_PORT=5432
DB_USERNAME=base
DB_PASSWORD=123456
DB_NAME=postgres
DB_SCHEMA=base_dev
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123

# Redis
REDIS_HOST=redis
REDIS_PORT=6379
REDIS_DB=0
REDIS_PASSWORD=123456
REDIS_PREFIX=base_dev

# JWT
SECRET_JWT=123456

#Mail
MAIL_HOST=Host của gmail
MAIL_FROM=Tài khoản gmail gửi đi
MAIL_USER=User của gmail
MAIL_PASS=Pass của gmail
```
##### Run
```
docker compose up -d --build
```
#### Stop
```
docker compose down
```

# Documentation (Swagger)
```
http://localhost:${port}/docs
```

# Principle
#### Single responsibility principle
- Mỗi Service chỉ được thực thi trong vòng phạm vi module của nó. Ví dụ các hàm viết trong MerchantService chỉ được thêm, xóa, sửa Merchant. 
- Không được phép Inject một Service của module khác vào trong Service. Chỉ được phép Inject Service vào class Handler

#### Liskov substitution principle
- Các class Handler và Service phải extend hoặc implement một abstract hoặc interface.
- Các class phải giao tiếp với nhau thông qua interface chứ không được giao tiếp trực tiếp qua instance

#### Dependency inversion principle
- Các class không được phụ thuộc vào instance và phụ thuộc vào interface của class khác.
- Ví dụ nếu muốn Inject Service A vào class Handler B,
ta không làm như thế này
```typescript
class BHandler {
  constructor(private readonly aService: AService){}
}
```
Thay vào đó
```typescript
class BHandler {
  constructor(private readonly aService: IAService){}
}
```
Trong đó <b>IAService</b> là một interface hay abstract class được class <b>AService</b> kế thừa.
```typescript
class AService extends IAService {}
```
Và trong Module không được khai báo như này
```typescript
@Module({
	providers: [
		AdminService,
		AdminHandler,
		AdminRepository
	],
	exports: [AdminService]
})
export class AdminModule {}
```
Thay vào đó
```typescript
@Module({
	providers: [
		{
			provide: IAdminService,
			useClass: AdminService
		},
		{
			provide: IAdminHandler,
			useClass: AdminHandler
		},
		AdminRepository
	],
	exports: [IAdminService]
})
export class AdminModule {}
```

# Generation
```
nest g res ${new-module}
```

Project đã custom lại package @nestjs/schematics và giữ lại custom nhờ <b>patch-package</b>.</br>
Có thể custom lại @nestjs/schematics bằng cách:
- Vào folder <b>node_modules/@nestjs/schematics/dist/lib/resource/files/ts</b>
- Custom thêm những gì mà bạn muốn.
  - <%= name %> In ra tên của module bạn vừa tạo. Ví dụ: <b>nest g user</b> -> user
  - <%= classify(name) %> In ra PascalCase tên của module bạn vừa tạo. Ví dụ: <b>nest g module-with-multiple-word</b> -> ModuleWithMultipleWord
  - <%= lowercased(name) %> In ra camelCase tên của module bạn vừa tạo. Ví dụ: <b>nest g super-admin</b> -> superAdmin
- Chạy lệnh sau để giữ lại các custom này

  ```
  yarn patch-package @nestjs/schematics
  ```
# Folder tree
```
├── admin.controller.ts -> Nơi chưa các route API, không được viết code logic vào đây. Controller chỉ giao tiếp với Handler
├── admin.handler.ts -> Nơi chưa code logic của module, giao tiếp với những service khác
├── admin.interface.ts -> Nơi chứa các interface hoặc abstract class
├── admin.module.ts
├── admin.repository.ts -> Repository của Entity, nơi giao tiếp giữa Backend và Database
├── admin.service.ts -> Nơi giao tiếp giữa Handler và Repository
├── dto
│   ├── create-admin.dto.ts -> Các class DTO phục vụ cho việc validation
│   └── update-admin.dto.ts -> Các class DTO phục vụ cho việc validation
├── entities
│   └── admin.entity.ts -> Entity của module
├── mocks
│   ├── admin.handler.ts -> Phục vụ cho việc unit test
│   ├── admin.repository.ts -> Phục vụ cho việc unit test
│   └── admin.service.ts -> Phục vụ cho việc unit test
└── test
    ├── admin.controller.spec.ts -> Unit test
    └── admin.service.spec.ts -> Unit test
```

# Commitlint
Project sử dụng husky và commitlint. Commit theo chuẩn của Angular, có thể đọc thêm [tại đây](https://github.com/conventional-changelog/commitlint)</br>
Cơ bản là: <br>
- chore: code không ảnh hưởng tới chức năng của production
- docs: cập nhật documentation
- feat: chức năng mới
- fix: fix bug
- refactor: refactor code
- test: cập nhật test
```
git commit -m "feat: message"
git commit -m "feat(Admin): message"
git commit -m "chore: message"
```

# Convention
- Tên biến phải dùng camelCase
- Tên class phải dùng PascalCase
- Tên của interface hoặc abstract class phải có thêm tiền tố I. Ví dụ IAdminService, IMerchantHandler