## 初始化
````
npm init -y 
npm install prisma typescript ts-node @types/node --save-dev
````

## 将数据模型映射到数据库架构
````
npx prisma migrate dev --name init
````

## 安装Prisma Client并生成
````
npm install @prisma/client
````
