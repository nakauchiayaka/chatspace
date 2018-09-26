# README

## membersテーブル
|Column|Type|Options|
|------|----|-------|
|id|integer|null: false, unique: true|
|user|references|null: false,index: true, foreign_key: true|
|group|references|null: false,index: true, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user

## usersテーブル
|Column|Type|Options|
|------|----|-------|
|id|integer|null: false, unique: true|
|name|string|null: false|
|e-mail|text|null: false|
|password|text|null: false|

### Association
- has_many :groups, through: :members
- has_many :members
- has_many :chats

## chatsテーブル
|Column|Type|Options|
|------|----|-------|
|id|integer|null: false, unique: true|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|
|text|text|
|image|text|

### Association
- belongs_to :user
- belongs_to :group

## groupsテーブル
|Column|Type|Options|
|------|----|-------|
|id|integer|null: false, unique: true|
|name|text|null: false|

### Association
- has_many :users, through: :members
- has_many :members
- has_many :chats

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
