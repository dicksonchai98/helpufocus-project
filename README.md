![1](https://github.com/dicksonchai98/helpufocus-project/assets/102925011/905a94d5-9fae-4b17-897d-c15d0a71f10b)
# HELP U FOCUS專案介紹

此專案為團對專案，成員包括一位uiux設計師、後端工程師及前端工程師，而我在專案當中扮演的角色是前端工程師的部分。而專案的想法其實是源自於自身很愛逛書店，也買了一堆書，可是房間的書越積越多，卻沒看完幾本。可是當和朋友約在咖啡廳看書時，因環境及有人互相督促的情況下，效率會變得特別好。因此HELP U FOCUS其實是類似讀書會的web,模擬大家身處在一個環境一起看書，功能包括社群、排名、及筆記的功能。

## 目录

1. [Features](#Features)
2. [專案架構](#專案架構)
3. [技術選型](#技術選型)
4. [技術選型](#技術選型)
5. [功能介紹](#功能介紹)
## Features
- 註冊/登入帳號
- 重設密碼
- 新增閲讀書籍
- 新增/刪除筆記
- 編輯筆記
- 新增完成頁面
- 收藏筆記
- 觀察所有用戶閲讀進度
- 追蹤用戶
- 上傳/刪除貼文
- 點贊貼文
- 收藏其他用戶貼文
- 閲讀進度條
- 該書閲讀進度條

## 專案架構
### assets
assets包含將在專案中使用的所有圖像、圖示、css 文件、字體文件等。
### components
components 文件夾包含專案的UI。包含我們所有的 UI 元件，如導航列、頁腳、按鈕、視窗等等。
### docs
api的使用説明及注意事項都會列在docs中
### layouts
它用於放置常用佈局的元件，例如側邊欄、導航欄和頁腳。
### middleware
用於限制非用戶瀏覽其他特定頁面
### pages
Nuxt會讀取pages目錄中的所有文件並自動為您建立路由設定。
### public
直接在伺服器根目錄提供服務，包含不會更改的公共文件，例如 favicon.ico。有些需要使用懶加載的圖片也會直接存在這邊
### server
後端撰寫api、error handle、環境變數的程式碼都會存放於此
### stores
此爲資料狀態管理的地方，通常需要多處共享相同資料及function都會存放在這裏
### package.json
package.json文件包含了应用程序的所有npm plugin的工具
### nuxt.config
可以通過這裏對專案的環境做簡單的配置

## 技術選型該專案採用了Nuxt框架，選擇Nuxt的原因是為了方便統一管理前後端程式碼。
- 該專案採用了Nuxt框架，選擇Nuxt的原因是為了方便統一管理前後端程式碼。
- 狀態管理方面選用了Pinia，所有需要共享的資料和函數都存放在這裡，包括一些呼叫後端API的資料以及使用者資訊等。
- 資料庫選擇了Firebase。
- 透過JWT方式存放在header中進行API的身份驗證。
- 使用者的登入狀態儲存在cookie中，以middleware判斷使用者是否有權限進入特定頁面的依據。
  refresh API存放在localStorage中，用於儲存token過期或刷新頁面取得新token，並存放token的過期時間以判斷是否需要呼叫刷新API。
- 後端API由後端工程師使用Express編寫。
- 專案的UI介面採用SCSS預處理器。
- 導入plugin工具處理過渡動畫等特效。
- UI介面由UI/UX設計師透過Figma設計。
- 專案的API採用async/await的方式編寫，讓程式碼邏輯更簡潔。
- 透過不同的生命週期分別在pinia及所需頁面呼叫和獲取API的資料。
- 使用watch和watchEffect監視需要根據資料變化而變化的資料。
- 使用Postman測試API，讓開發流程更流暢。
- 透過prop emit的方式處理父子元件之間的資料傳遞邏輯。
- 使用error handle處理各種錯誤事件並彈出提示，如登入錯誤等。
- 所有拆分的元件都會保存在components中管理，而頁面則保存在pages中。
- 使用Netlify部署專案。
- 前後端分別使用Git和GitHub管理和維護專案程式碼。
- 使用bundle map分析chunk size過大的部分，然後刪除不必要的文件，以提高效能。
- 該專案採用了Nuxt框架，選擇Nuxt的原因是為了方便統一管理前後端程式碼。
- rwd製作中。。。

## 功能介紹
### 社群
社群功能可提供用戶上傳閲讀筆記，也能觀察別人的筆記。此外，功能還包括點贊、刪除貼文、收藏用戶貼文、新增或選擇筆記上傳

![image](https://github.com/dicksonchai98/helpufocus-project/assets/102925011/7f99b8bd-bb20-4b94-8364-04ef2e7338ad)

### 排名
排名功能可提供用戶觀察所有注冊用戶的閲讀目標及閲讀進度，此功能的目的為達到互相督促的效果，而當中沒有順序之分。此外，提供用戶追蹤其他用戶的功能，可以直接在觀察名單上直接看到已追蹤的用戶排名

![image](https://github.com/dicksonchai98/helpufocus-project/assets/102925011/85a134c2-26a0-4eff-8b17-f5eef75bf449)

### 新增書籍及筆記
新增接下來想要閲讀的書籍，可在該書籍底下新增筆記。此外，功能包括新增已完成頁數、編輯筆記、收藏筆記等。當該書籍頁數已完成會自動被歸納爲完成書籍

![image](https://github.com/dicksonchai98/helpufocus-project/assets/102925011/9d721b29-8b9d-4967-bebb-0ab5d3b58287)
![image](https://github.com/dicksonchai98/helpufocus-project/assets/102925011/62504fb2-32b8-482c-a776-99f4594d1682)


Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
