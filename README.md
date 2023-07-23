nest 기본 라이브러리 모듈 생성 명령어

```bash
nest generate library common
```

libs폴더에 모듈 생성됨

libs

```bash
nest generate module database -p common
nest generate module config -p common
```

mongodb 켜기

```bash
mongod --dbpath=data/db
```

package 추가

```zsh
yarn add @nestjs/mongoose mongoose @nestjs/config joi class-validator class-transformer nestjs-pino pino-http pino-pretty @nestjs/jwt passport-jwt
```
